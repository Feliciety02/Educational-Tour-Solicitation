import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Heart,
  Send,
  Check,
  Copy,
  Smartphone,
  CreditCard,
  Lock,
  EyeOff,
} from "lucide-react";

import GCashQR from "@/components/Images/Gcash.png";
import LandbankQR from "@/components/Images/Landbank.png";

const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

const paymentMethods = [
  {
    id: "gcash",
    name: "GCash Donation",
    icon: Smartphone,
    headerColor: "from-[#007DFE] to-[#0066CC]",
    accountName: "Fe Anne Malasarte",
    accountNumber: "09758373702",
    qrImage: GCashQR,
  },
  {
    id: "landbank",
    name: "Landbank Donation",
    icon: CreditCard,
    headerColor: "from-[#22C55E] to-[#16A34A]",
    accountName: "Fe Anne Malasarte",
    accountNumber: "0167390250",
    qrImage: LandbankQR,
  },
];

const ADMIN_PASSWORD = "123";

const DonationSection = () => {
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    message: "",
    isAnonymous: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);
  const [askPassword, setAskPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleQuickAmount = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const unlockAdmin = () => {
    if (password === ADMIN_PASSWORD) {
      setShowAdmin(true);
      setAskPassword(false);
      setPassword("");
      toast({
        title: "Unlocked",
        description: "Admin form is now visible",
      });
      return;
    }

    toast({
      title: "Wrong password",
      description: "Try again",
      variant: "destructive",
    });
  };

  const lockAdmin = () => {
    setShowAdmin(false);
    setAskPassword(false);
    setPassword("");
    toast({
      title: "Locked",
      description: "Admin form is now hidden",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.donorName.trim() || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please enter donor name and amount",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: formData.donorName.trim(),
        amount,
        message: formData.message.trim() || null,
        is_anonymous: formData.isAnonymous,
      });

      if (error) throw error;

      toast({
        title: "Saved",
        description: "Donation added to leaderboard list",
      });

      setFormData({
        donorName: "",
        amount: "",
        message: "",
        isAnonymous: false,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to save donation",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const adminButtonText = useMemo(() => {
    if (showAdmin) return "Hide admin form";
    if (askPassword) return "Enter password";
    return "Admin only";
  }, [showAdmin, askPassword]);

  return (
    <section id="donate" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Heart className="w-7 h-7 text-primary" />
          </div>
          <span className="block text-primary font-medium mb-4">
            Support My Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Generosity <span className="text-gradient">Truly Matters</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scan a QR code to donate. Thank you for supporting my educational tour.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8 grid md:grid-cols-2 gap-6">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              <div
                className={`bg-gradient-to-r ${method.headerColor} px-6 py-4 flex items-center gap-3`}
              >
                <method.icon className="w-5 h-5 text-white" />
                <span className="font-semibold text-white">{method.name}</span>
              </div>

              <div className="p-6">
                <div className="bg-white rounded-xl p-6 mb-6 flex flex-col items-center shadow-sm">
                  <img
                    src={method.qrImage}
                    alt={`${method.name} QR`}
                    className="w-64 h-64 md:w-72 md:h-72 object-contain"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Account Name
                    </p>
                    <p className="font-semibold">{method.accountName}</p>
                  </div>

                  <div>
                    <p className="text-xs text-primary mb-1">Account Number</p>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg tracking-wider">
                        {method.accountNumber}
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(method.accountNumber, "Account number")
                        }
                        className="p-2 hover:bg-muted rounded-lg"
                        title="Copy"
                        type="button"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* masked admin access */}
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => {
                if (showAdmin) return lockAdmin();
                setAskPassword((v) => !v);
              }}
            >
              {showAdmin ? (
                <EyeOff className="w-4 h-4 mr-2" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              {adminButtonText}
            </Button>
          </div>

          {askPassword && !showAdmin && (
            <div className="mt-4 bg-card rounded-2xl p-6 border border-border shadow-lg">
              <Label>Password</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <Button type="button" onClick={unlockAdmin}>
                  Unlock
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                This is for the owner only.
              </p>
            </div>
          )}

          {showAdmin && (
            <div className="mt-6 bg-card rounded-3xl p-8 border border-border shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Add Donation Entry
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Use this form to manually add donors you received via message.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Donor Name *</Label>
                  <Input
                    value={formData.donorName}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, donorName: e.target.value }))
                    }
                    className="mt-2"
                    placeholder="Full name"
                  />
                </div>

                <div>
                  <Label>Quick Amount</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={
                          formData.amount === amount.toString()
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleQuickAmount(amount)}
                        className="rounded-xl"
                      >
                        ₱{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Donation Amount *</Label>
                  <Input
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, amount: e.target.value }))
                    }
                    min="1"
                    className="mt-2"
                    placeholder="Amount in PHP"
                  />
                </div>

                <div>
                  <Label>Message</Label>
                  <Textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    className="mt-2"
                    placeholder="Optional note"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={formData.isAnonymous}
                    onCheckedChange={(checked) =>
                      setFormData((p) => ({
                        ...p,
                        isAnonymous: checked as boolean,
                      }))
                    }
                  />
                  <Label>Make this entry anonymous</Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl gradient-vibrant text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Saving..."
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Save Entry
                    </>
                  )}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonationSection;

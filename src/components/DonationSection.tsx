import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Heart, Send, Check, Copy, Smartphone, CreditCard } from "lucide-react";

const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

// Payment methods with placeholder info
const paymentMethods = [
  {
    id: "gcash",
    name: "GCash Donation",
    icon: Smartphone,
    color: "bg-[#007DFE]",
    headerColor: "from-[#007DFE] to-[#0066CC]",
    accountName: "Your Name Here",
    accountNumber: "09XX XXX XXXX",
    qrPlaceholder: true,
  },
  {
    id: "maribank",
    name: "MariBank Donation",
    icon: CreditCard,
    color: "bg-[#FF6B35]",
    headerColor: "from-[#FF6B35] to-[#E55A2B]",
    accountName: "Your Name Here",
    accountNumber: "XXXX XXXX XXXX",
    qrPlaceholder: true,
  },
];

const DonationSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    donorName: "",
    amount: "",
    message: "",
    isAnonymous: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickAmount = (amount: number) => {
    setFormData((prev) => ({ ...prev, amount: amount.toString() }));
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.donorName.trim() || !formData.amount) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and donation amount.",
        variant: "destructive",
      });
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: formData.donorName.trim(),
        amount: amount,
        message: formData.message.trim() || null,
        is_anonymous: formData.isAnonymous,
      });

      if (error) throw error;

      toast({
        title: "Thank You! 🎉",
        description: "Your donation has been recorded. You're amazing!",
      });

      setFormData({
        donorName: "",
        amount: "",
        message: "",
        isAnonymous: false,
      });
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast({
        title: "Error",
        description: "Failed to record your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="donate" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Heart className="w-7 h-7 text-primary" />
          </div>
          <span className="block text-primary font-medium mb-4">Support My Journey</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your Generosity <span className="text-gradient">Truly Matters</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every contribution, no matter how big, brings me closer to this life-changing opportunity. Thank you for believing in my dreams.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg">
                {/* Header */}
                <div className={`bg-gradient-to-r ${method.headerColor} px-6 py-4 flex items-center gap-3`}>
                  <method.icon className="w-5 h-5 text-white" />
                  <span className="font-semibold text-white">{method.name}</span>
                </div>

                {/* QR Code Area */}
                <div className="p-6">
                  <div className="bg-white rounded-xl p-6 mb-6 flex flex-col items-center">
                    {/* Placeholder QR */}
                    <div className="w-40 h-40 bg-muted rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-muted-foreground/30">
                      <div className="text-center text-muted-foreground">
                        <div className="grid grid-cols-5 gap-1 mb-2">
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-sm ${
                                Math.random() > 0.5 ? "bg-foreground/20" : "bg-foreground/60"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs">QR Code</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Scan to pay via {method.id === "gcash" ? "GCash" : "MariBank"}
                    </p>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Account Name</p>
                      <p className="font-semibold">{method.accountName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-primary mb-1">Account Number</p>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-lg tracking-wider">{method.accountNumber}</p>
                        <button
                          onClick={() => copyToClipboard(method.accountNumber, "Account number")}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                          title="Copy to clipboard"
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
        </div>

        {/* Donation Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl p-8 border border-border shadow-xl">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Record Your Donation
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              After sending your donation, please fill out this form to be added to the leaderboard.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <Label htmlFor="donorName">Your Name *</Label>
                <Input
                  id="donorName"
                  placeholder="Enter your full name"
                  value={formData.donorName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, donorName: e.target.value }))}
                  className="mt-2"
                />
              </div>

              {/* Quick amounts */}
              <div>
                <Label>Quick Amount Selection</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant={formData.amount === amount.toString() ? "default" : "outline"}
                      onClick={() => handleQuickAmount(amount)}
                      className="rounded-xl"
                    >
                      ₱{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom amount */}
              <div>
                <Label htmlFor="amount">Donation Amount (₱) *</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                  className="mt-2"
                  min="1"
                />
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Leave an encouraging message..."
                  value={formData.message}
                  onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                  className="mt-2"
                  rows={3}
                />
              </div>

              {/* Anonymous */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, isAnonymous: checked as boolean }))
                  }
                />
                <Label htmlFor="anonymous" className="cursor-pointer">
                  Make my donation anonymous
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl gradient-vibrant text-white font-semibold py-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Recording..."
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Record My Donation
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;

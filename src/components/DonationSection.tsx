import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Smartphone, Send, Check, Heart, Wallet } from "lucide-react";

const quickAmounts = [100, 250, 500, 1000, 2500, 5000];

const steps = [
  { step: 1, text: "Open your GCash app" },
  { step: 2, text: "Tap 'Send Money' and enter the number below" },
  { step: 3, text: "Enter your donation amount and confirm" },
  { step: 4, text: "Take a screenshot of the confirmation" },
  { step: 5, text: "Fill out the form below to be added to the leaderboard" },
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
    <section id="donate" className="py-20 gradient-vibrant">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Make a Difference
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Support Our Journey
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Every peso brings us closer to our goal. Your generosity will help 40 students experience this life-changing educational tour.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* GCash Instructions */}
          <div className="glass-card rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-[#007DFE] flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Donate via GCash</h3>
                <p className="text-muted-foreground text-sm">Quick and easy mobile payment</p>
              </div>
            </div>

            {/* GCash Number */}
            <div className="bg-muted/50 rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Send to this GCash Number</p>
              <p className="text-3xl font-bold tracking-wider">0917 123 4567</p>
              <p className="text-sm text-muted-foreground mt-2">Feanne M.</p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              <p className="font-semibold">How to Donate:</p>
              {steps.map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary">
                    {item.step}
                  </div>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Form */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Record Your Donation
            </h3>

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
                  placeholder="Leave an encouraging message for the students..."
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

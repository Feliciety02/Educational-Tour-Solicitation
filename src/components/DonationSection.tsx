import { Button } from "@/components/ui/button";
import { Heart, Copy, Smartphone, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import GCashQR from "@/components/Images/Gcash.png";
import LandbankQR from "@/components/Images/Landbank.png";

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

const DonationSection = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

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

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
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
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="rounded-lg"
                        onClick={() =>
                          copyToClipboard(method.accountNumber, "Account number")
                        }
                        title="Copy"
                      >
                        <Copy className="w-4 h-4 text-muted-foreground hover:text-primary" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DonationSection;

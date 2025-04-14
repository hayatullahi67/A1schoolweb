import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";

export function SocialShareButtons() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon">
        <Facebook />
      </Button>
      <Button variant="outline" size="icon">
        <Twitter />
      </Button>
      <Button variant="outline" size="icon">
        <Linkedin />
      </Button>
      <Button variant="outline" size="icon">
        <Mail />
      </Button>
    </div>
  );
}

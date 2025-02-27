import { Globe, Plane, Shield, Smile } from "lucide-react";

const InfoGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
      <div className="flex flex-col items-center">
        <Globe className="w-10 h-10 text-gray-800" />
        <p>Gratis frakt och returer</p>
      </div>
      <div className="flex flex-col items-center">
        <Plane className="w-10 h-10 text-gray-800" />
        <p>Expressfrakt</p>
      </div>
      <div className="flex flex-col items-center">
        <Shield className="w-10 h-10 text-gray-800" />
        <p>Säkra betalningar</p>
      </div>
      <div className="flex flex-col items-center">
        <Smile className="w-10 h-10 text-gray-800" />
        <p>Nyheter varje dag</p>
      </div>
    </div>
  );
};

export default InfoGrid;

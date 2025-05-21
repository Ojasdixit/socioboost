
interface ClientLogoProps {
  name: string;
  src?: string;
  altText?: string;
}

const ClientLogo: React.FC<ClientLogoProps> = ({ name, src, altText }) => {
  return (
    <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
      {src ? (
        <img src={src} alt={altText || name} className="max-h-12" />
      ) : (
        <div className="text-xl font-bold text-gray-400 hover:text-gray-700 transition-colors">{name}</div>
      )}
    </div>
  );
};

export default ClientLogo;

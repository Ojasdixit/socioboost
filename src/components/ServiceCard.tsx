
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  bgColor?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon, 
  link, 
  bgColor = 'bg-blue-50'
}) => {
  return (
    <Link to={link} className="block">
      <div className="service-card group">
        <div className={`p-6 transition-all duration-300 h-full ${bgColor} group-hover:bg-opacity-80`}>
          <div className="mb-4 text-brand-blue">{icon}</div>
          <h3 className="font-bold text-xl mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="font-medium text-brand-blue flex items-center">
            Learn More
            <svg
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;

interface HeroSectionProps {
  className?: string;
  cntClassName?: string;
  content: string; // | '3/9' | '4/8' | '5/4' | '5/7' | '6/6' | '7/5' | '8/4' | '9/3' | '0/0'
  col1?: any;
  col2?: any;
  image?: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const HeroSection: React.FC<HeroSectionProps> = ({
  className,
  cntClassName,
  content,
  col1,
  col2,
  image,
  size,
}) => {
  const styleImage = image
    ? {
        ['backgroundImage' as any]: `url(${image})`,
      }
    : {};

  return (
    <div
      className={`hero hero-${size} ${className ? className : ''}`}
      style={styleImage}
    >
      <div className="container">
        <div className="row flex-lg-row align-items-center">
          {col1 ? (
            <div
              className={`${cntClassName ? cntClassName : ''} col-lg-${
                content.split('/')[0]
              }`}
            >
              {col1}
            </div>
          ) : (
            ''
          )}
          {col2 ? (
            <div className={`col-lg-${content.split('/')[1]}`}>{col2}</div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import parse from 'html-react-parser';
import { FAQPageJsonLd } from 'next-seo';
import { IFaq } from '../../../types/faq';

interface FaqProps {
  header: string;
  faq: IFaq[];
}

const Faq: React.FC<FaqProps> = ({ faq, header }) => {
  return (
    <>
      <h3 id="FAQs" className="divider-small text-uppercase">
        {header}
      </h3>

      <FAQPageJsonLd
        mainEntity={faq.map((faq) => {
          return {
            questionName: faq.question,
            acceptedAnswerText: faq.answer,
          };
        })}
      />
      <div id="faqs" className="accordion col-12 pb-4">
        {faq.map((faq, index) => (
          <div key={index} id={`faqItem-${index}`} className="accordion-item">
            <h4 id={`faqQuestion-${index}`} className="accordion-header my-0">
              <button
                className="accordion-button h4 collapsed my-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faqAnswer-${index}`}
                aria-expanded="true"
                aria-controls={`faqAnswer-${index}`}
              >
                {parse(faq.question)}
              </button>
            </h4>
            <div
              id={`faqAnswer-${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`faqQuestion-${index}`}
              data-bs-parent="#faqs"
            >
              <div className="accordion-body">{parse(faq.answer)}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;

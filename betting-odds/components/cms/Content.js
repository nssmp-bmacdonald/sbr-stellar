import parse from 'html-react-parser';

const CMSContent = ({ bettingArticle }) => {
    return (
        <div className='content-odds padding-container'>
            {bettingArticle?.content ? parse(bettingArticle?.content) : null}
            {
            (bettingArticle?.faqs?.questions && bettingArticle.faqs.questions.length > 0) ?
                <div className='content-faqs'>
                <h2 className='title-container'>{bettingArticle.faqs.header ? bettingArticle.faqs.header : 'Frequently Asked Questions'}</h2>
                {
                    bettingArticle.faqs.questions.map((faq, index) =>
                            <div id={`faq-${index}`} key={index}>
                                <h3>{faq.question}</h3>
                                <div>{parse(faq.answer)}</div>
                            </div>
                    )
                }
                </div>
                : null
            }
        </div>
      );
}

export default CMSContent;

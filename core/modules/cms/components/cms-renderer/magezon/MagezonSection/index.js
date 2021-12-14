import MagezonElement from '@core_modules/cms/components/cms-renderer/magezon/index';

const MagezonSection = (props) => {
    const { elements, storeConfig } = props;

    return (
        <>
            <div className="mgz-section">
                {elements.map((element, index) => (
                    <div className="mgz-section-item">
                        <MagezonElement key={index} {...element} storeConfig={storeConfig} />
                    </div>
                ))}
            </div>
            <style jsx>
                {`
                    .mgz-section-item {
                        margin: 20px 0;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonSection;

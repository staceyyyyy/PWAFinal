import Carousel from '@core_modules/cms/components/cms-renderer/magezon/MagezonProduct/Slider';
import MagezonSection from '@core_modules/cms/components/cms-renderer/magezon/MagezonSection';

const MagezonPageableContainer = (props) => {
    const { elements, storeConfig, ...rest } = props;

    return (
        <>
            <div className="mgz-pageable-container">
                <Carousel {...rest}>
                    {elements.map((element, index) => {
                        if (element.length === 0) {
                            return null;
                        }
                        return <MagezonSection key={index} elements={element.elements} storeConfig={storeConfig} />;
                    })}
                </Carousel>
            </div>
            <style jsx>
                {`
                    .mgz-pageable-container :global(.mgz-product-slider-content) {
                        text-align: initial;
                    }
                    .mgz-pageable-container :global(.mgz-product-slider),
                    .mgz-pageable-container :global(.mgz-product-slider-content),
                    .mgz-pageable-container :global(.slick-slider),
                    .mgz-pageable-container :global(.slick-list),
                    .mgz-pageable-container :global(.slick-track),
                    .mgz-pageable-container :global(.slick-track > div) {
                        // max-height: 600px;
                    }
                    .mgz-pageable-container :global(.slick-track > div) {
                        overflow-y: scroll;
                    }
                    .mgz-pageable-container :global(.slick-track > div::-webkit-scrollbar) {
                        /* Hide scrollbar for Chrome, Safari and Opera */
                        display: none;
                    }
                    .mgz-pageable-container :global(.slick-track > div) {
                        -ms-overflow-style: none; /* IE and Edge */
                        scrollbar-width: none; /* Firefox */
                    }
                    .mgz-pageable-container :global(.slick-list) {
                        max-width: 100vw;
                        width: 100%;
                    }
                `}
            </style>
        </>
    );
};

export default MagezonPageableContainer;

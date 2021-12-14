import Slider from '@material-ui/core/Slider';

const SliderRadius = ({ radius, setRadius }) => (
    <div className="slider-radius">
        <style jsx>
            {`
                .slider-radius > :global(span) {
                    padding: 20px 0;
                }
            `}
        </style>
        <div style={{ lineHeight: '10px' }}>
            1 Km
            <span style={{ float: 'right' }}>100 Km</span>
        </div>
        <Slider
            value={radius}
            onChange={(e, newValue) => setRadius(newValue)}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            scale={(x) => Math.round(x / 1000)}
            step={1000}
            min={1000}
            max={100 * 1000}
        />
    </div>
);

export default SliderRadius;

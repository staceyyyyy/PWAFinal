import { jarallax } from 'jarallax';

/* eslint-disable */
export default class MagezonParallax extends React.Component {
    constructor(props) {
        super(props);

        this.$el = React.createRef();
    }

    // init on mount.
    componentDidMount() {
        const { mouseParallax, options } = this.props;

        jarallax(this.$el.current, options);

        if (mouseParallax) {
            this.$el.current.addEventListener('mousemove', (e) => this.mouseParallax(e));
            this.$el.current.addEventListener('mouseout', (e) => this.mouseOut(e));
        }
    }

    // reinit when props changed.
    componentDidUpdate(prevProps) {
        if (!this.isDestroyed && JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            jarallax(this.$el.current, 'destroy');
            jarallax(this.$el.current, this.props.options);
        }
    }

    // destroy on unmount.
    componentWillUnmount() {
        const { mouseParallax } = this.props;

        this.isDestroyed = true;
        jarallax(this.$el.current, 'destroy');

        if (mouseParallax) {
            this.$el.current.removeEventListener('mousemove', this.mouseParallax)
            this.$el.current.removeEventListener('mouseout', this.mouseOut)
        }
    }

    mouseOut(e) {
        this.$el.current.style.transform = 'translateX(0) translateY(0)';
    }

    mouseParallax(e) {
        const { mouseSize } = this.props;

        const _w = window.innerWidth/2;
        const _h = window.innerHeight/2;
        const _mouseX = e.clientX;
        const _mouseY = e.clientY;
        const x = _mouseX < _w ? mouseSize : -mouseSize;
        const y = _mouseY < _h ? mouseSize : -mouseSize;
        const posX = (_mouseX * 0.01 + x);
        const posY = (_mouseY * 0.01 + y);

        this.$el.current.style.transform = `translateX(${posX}px) translateY(${posY}px)`;
    }

    render() {
        const { src, speed, type } = this.props;

        return (
            <div
                className="jarallax"
                ref={this.$el}
                data-speed={speed}
                data-type={type}
                style={{ backgroundImage: `url(${src})` }}
            ></div>
        );
    }
}

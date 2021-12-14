const Avatar = (props) => {
    const { className, name } = props;
    const char = name.substring(0, 1);
    const randomColor = () => {
        const hex = Math.floor(Math.random() * 0xFFFFFF);
        const color = `#${hex.toString(16)}`;

        return color;
    };
    return (
        <div className={className} style={{ backgroundColor: randomColor() }}>
            <span className="text-name">{char}</span>
        </div>
    );
};

export default Avatar;

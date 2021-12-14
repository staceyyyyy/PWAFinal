const ButtonCompare = (props) => {
    const { children, onClick, className } = props;
    return (
        <>
            <button type="button" onClick={() => onClick()} className={className}>
                {children}
            </button>
        </>
    );
};

export default ButtonCompare;

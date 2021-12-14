import Typography from '@core_modules/commons/Typography/';

const Heading = (props) => {
    // prettier-ignore
    const {
        description,
        title, title_align, title_tag, title_color,
        line_color, line_position, line_width, show_line,
    } = props;

    const showLineClass = show_line ? 'mgz-common-headings-line' : '';
    const linePosClass = show_line && line_position === 'bottom' ? 'mgz-common-headings-line--bottom' : '';

    return (
        <>
            {(title || description) && (
                <div className={`mgz-common-headings ${showLineClass} ${linePosClass}`}>
                    {title && (
                        <div className="mgz-common-headings-title">
                            <Typography variant={title_tag} align={title_align}>
                                {title.toUpperCase()}
                            </Typography>
                        </div>
                    )}
                    <div>{description}</div>
                </div>
            )}
            <style jsx>
                {`
                    .mgz-common-headings {
                        text-align: ${title_align};
                        position: relative;
                        margin-bottom: 10px;
                        padding-bottom: 10px;
                    }
                    .mgz-common-headings-line:before {
                        content: '';
                        z-index: 0;
                        display: block;
                        position: absolute;
                        bottom: 0;
                        top: 40%;
                        width: 100%;
                        height: ${line_width ? `${line_width}px` : '1px'};
                        background-color: ${line_color || '#cecece'};
                    }
                    .mgz-common-headings-line--bottom:before {
                        top: auto;
                        bottom: 0;
                    }
                    .mgz-common-headings-title {
                        background-color: #ffffff;
                        display: inline-block;
                        position: relative;
                    }
                    .mgz-common-headings-title :global(*[class*='Typography']) {
                        ${title_color ? `color: ${title_color};` : ''}
                    }
                `}
            </style>
        </>
    );
};

export default Heading;

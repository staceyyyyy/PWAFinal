import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const NewsletterView = (props) => {
    // base props
    const {
        formik, loading, t, ...others
    } = props;

    // magezon newsletter props
    const {
        form_height,
        title_color,
        form_width,
        isCms = false,
        show_firstname,
        show_lastname,
        layout_type,
        description,
        title,
        title_font_size,
        button_background_color,
        button_border_color,
        button_border_radius = 0,
        button_border_style,
        button_border_width,
        button_color,
        button_hover_background_color,
        button_hover_border_color,
        button_hover_color,
        title_spacing,
    } = others;

    const [totalHeight, setTotalHeight] = React.useState(0);

    React.useEffect(() => {
        if (totalHeight === 0) {
            let total = 0;
            if (show_firstname && show_lastname) {
                total = form_height ? Number(form_height) * 3 + 230 : 20 * 3 + 230;
                setTotalHeight(total);
            } else if (!show_firstname && !show_lastname) {
                total = form_height ? Number(form_height) + 230 : 10 + 200;
                setTotalHeight(total);
            } else {
                total = form_height ? Number(form_height) * 2 + 230 : 10 * 2 + 220;
                setTotalHeight(total);
            }
        }
    }, [totalHeight]);
    /* eslint-disable */
    return (
        <div>
            <div className="newsletter-container">
                <div className="wrapper">
                    <div className="title">
                        <h3>{isCms && title ? title : t('common:newsletter:title')}</h3>
                    </div>
                    {isCms && description ? (
                        <div className="description">
                            <p>{description}</p>
                        </div>
                    ) : null}
                    <div className="block-newsletter">
                        <div className="content">
                            <form className="form subscribe" noValidate id="newsletter-validate-detail" onSubmit={formik.handleSubmit}>
                                <div className="field-newsletter">
                                    <div className="control">
                                        <label htmlFor="newsletter">
                                            <input
                                                name="email"
                                                type="email"
                                                id="newsletter"
                                                placeholder={t('common:newsletter:placeholder')}
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                error={(!!formik.errors.email).toString()}
                                                errormessage={formik.errors.email || null}
                                            />
                                        </label>
                                    </div>
                                </div>
                                {show_firstname && isCms ? (
                                    <div className="field-newsletter">
                                        <div className="control">
                                            <label htmlFor="newsletter">
                                                <input
                                                    name="firstname"
                                                    type="text"
                                                    id="newsletter"
                                                    placeholder={t('common:newsletter:firstname')}
                                                    value={formik.values.firstname}
                                                    onChange={formik.handleChange}
                                                    error={(!!formik.errors.firstname).toString()}
                                                    errormessage={formik.errors.firstname || null}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : null}
                                {show_lastname && isCms ? (
                                    <div className="field-newsletter">
                                        <div className="control">
                                            <label htmlFor="newsletter">
                                                <input
                                                    name="lastname"
                                                    type="text"
                                                    id="newsletter"
                                                    placeholder={t('common:newsletter:lastname')}
                                                    value={formik.values.lastname}
                                                    onChange={formik.handleChange}
                                                    error={(!!formik.errors.lastname).toString()}
                                                    errormessage={formik.errors.lastname || null}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="actions">
                                    <button
                                        className="action subscribe primary"
                                        title="Subscribe"
                                        type="submit"
                                        disabled={loading}
                                        aria-label="Subscribe"
                                        onClick={() =>
                                            formik.values.email === ''
                                                ? window.toastMessage({
                                                      open: true,
                                                      variant: 'error',
                                                      text: t('common:newsletter:emptyValue'),
                                                  })
                                                : ''
                                        }
                                    >
                                        {loading ? <CircularProgress color="inherit" size={14} /> : <span>{t('common:newsletter:buttonLabel')}</span>}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>
                {`
                    .newsletter-container {
                        position: relative;
                        margin-bottom: -40px;
                        height: ${layout_type === 'box'
                            ? `${title_font_size ? Number(title_font_size) + totalHeight + 40 : totalHeight}px`
                            : title_font_size
                            ? `${170 + Number(title_font_size) + 20}px`
                            : '170px'};
                        background: #f4f4f4;
                        padding: 10px 10px 10px 10px;
                    }
                    .wrapper {
                        position: absolute;
                        text-align: center;
                        width: 100%;
                        top: 45%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    .title {
                        font-size: ${isCms ? `${title_font_size}px` : '16px'};
                        text-align: ${isCms ? 'left' : 'center'};
                        margin-left: 10px;
                        color: ${title_color ? title_color : 'black'};
                    }
                    .title h3 {
                        font-weight: 600;
                        letter-spacing: ${title_spacing && isCms ? title_spacing : '0.72'}px;
                    }
                    .block-newsletter {
                        margin: 0 auto;
                        max-width: ${layout_type === 'box' ? '100%' : '100%'};
                        width: ${layout_type === 'box' ? '100%' : isCms ? '100%' : 'max-content'};
                    }
                    .form.subscribe {
                        display: flex;
                        flex-direction: ${layout_type === 'box' ? 'column' : 'row'};
                        width: 100%;
                        margin-top: 20px;
                        justify-content: flex-start;
                        align-items: flex-start;
                    }
                    .actions {
                        display: table-cell;
                        vertical-align: top;
                    }
                    .field-newsletter {
                        margin-left: 10px;
                    }
                    .field-newsletter input {
                        background: #fff;
                        background-clip: padding-box;
                        border: 1px solid silver;
                        border-radius: 0;
                        font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        font-size: 13px;
                        height: ${form_height ? `${form_height}px` : '40px'};
                        line-height: 1.42857143;
                        padding: 14px 13px;
                        vertical-align: baseline;
                        width: 100%;
                        box-sizing: border-box;
                        padding: 0 20px 0;
                        min-width: ${layout_type === 'box' ? `${form_width}px` : '200px'};
                        margin-bottom: ${layout_type === 'box' ? '10px' : '0px'};
                    }
                    .action.subscribe {
                        background: ${isCms ? button_background_color : '#000'};
                        border: ${isCms ? `${button_border_width}px ${button_border_style} ${button_border_color}` : '#000'};
                        font-weight: bold;
                        width: ${layout_type === 'box' ? `${form_width}px` : '120px'};
                        text-transform: uppercase;
                        padding: 11px 15px;
                        height: ${form_height ? `${form_height}px` : '40px'};
                        margin-left: 10px;
                        white-space: nowrap;
                        color: ${isCms ? button_color : '#fff'};
                        border-radius: ${isCms ? `${button_border_radius}px` : '20px'};
                        cursor: pointer;
                    }
                    .action.subscribe:hover {
                        background-color: ${isCms ? button_hover_background_color : ''};
                        border-color: ${isCms ? button_hover_border_color : ''};
                        color: ${isCms ? button_hover_color : ''};
                    }
                    @media screen and (max-width: 767px) {
                        .newsletter-container {
                            background: #fff;
                            height: ${layout_type === 'box' ? `${totalHeight}px` : isCms ? (form_height ? `${totalHeight}px` : '55vh') : '170px'};
                        }
                        .wrapper {
                            top: 50%;
                        }
                        .title {
                            display: ${isCms ? '' : 'none'};
                        }
                        .block-newsletter {
                            max-width: 100%;
                            width: 90%;
                        }
                        .actions {
                            display: block;
                            margin-top: 20px;
                        }
                        .action.subscribe {
                            width: 100%;
                            margin-left: 10px;
                        }
                        .form.subscribe {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            margin-top: 20px;
                            justify-content: center;
                            align-items: center;
                        }
                        .field-newsletter {
                            margin-bottom: 10px;
                        }
                        .field-newsletter input {
                            background: #fff;
                            background-clip: padding-box;
                            border: 1px solid silver;
                            border-radius: 0;
                            font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            font-size: 13px;
                            height: 40px;
                            line-height: 1.42857143;
                            padding: 14px 13px;
                            vertical-align: baseline;
                            width: 100%;
                            box-sizing: border-box;
                            padding: 0 20px 0;
                            min-width: 300px;
                        }
                        .action.subscribe {
                            background: ${isCms ? '' : '#000'};
                            border: #000;
                            font-weight: bold;
                            width: 300px;
                            text-transform: uppercase;
                            height: 40px;
                            white-space: nowrap;
                            color: #fff;
                            border-radius: 20px;
                            cursor: pointer;
                        }
                    }
                    .description {
                        margin-top: 10px;
                        margin-bottom: 10px;
                        text-align: left;
                        margin-left: 10px;
                    }
                `}
            </style>
        </div>
    );
    /* eslint-enable */
};

export default NewsletterView;

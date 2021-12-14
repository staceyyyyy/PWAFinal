/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
// import SelectColor from '@common_forms/SelectColor';
// import SelectSize from '@common_forms/SelectSize';
// import { formatPrice } from '@helper_currency';

import Footer from '@plugin_optionitem/components/Footer';

const Checkbox = ({
    val, handleOption, disabled,
}) => (
    <div className="options-container">
        <input
            type="checkbox"
            onClick={() => !disabled && handleOption(val.id, val.price)}
            id={val.id}
            name={val.id}
            value={val.id}
            defaultChecked={val.is_default}
            disabled={disabled}
        />
        <label
            className="label-options"
            htmlFor={val.id}
            dangerouslySetInnerHTML={{
                __html: `${val.title} + <b>${val.price}</b>`,
            }}
        />
        <br />
        <hr />
    </div>
);

const DownloadView = (props) => {
    const {
        items, handleOption, disabled, loading,
        showQty = true, qty, setQty, handleAddToCart, t,
        showAddToCart = true, ...other
    } = props;
    return (
        <>
            <div className="options-container">
                {items.map((val, key) => (
                    <Checkbox disabled={disabled} val={val} key={key} handleOption={handleOption} />
                ))}
                <br />
            </div>
            <Footer
                loading={loading}
                disabled={disabled}
                showQty={showQty}
                handleAddToCart={handleAddToCart}
                qty={qty}
                setQty={setQty}
                t={t}
                showAddToCart={showAddToCart}
                {...other}
            />
        </>
    );
};

export default DownloadView;

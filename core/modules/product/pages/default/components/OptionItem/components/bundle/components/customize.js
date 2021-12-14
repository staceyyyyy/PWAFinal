/* eslint-disable no-param-reassign */
/* eslint-disable array-callback-return */
/* eslint-disable radix */
/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-plusplus */
import Typography from '@common_typography';
import ButtonQty from '@common_buttonqty';
import Button from '@common_button';
import dynamic from 'next/dynamic';
import useStyles from '../style';

const Select = dynamic(() => import('./customizeType/select'), { ssr: false });
const Multiple = dynamic(() => import('./customizeType/multiple'), { ssr: false });
const Radio = dynamic(() => import('./customizeType/radio'), { ssr: false });
const Checkbox = dynamic(() => import('./customizeType/checkbox'), { ssr: false });

const GenerateOptionsSelect = (props) => {
    const { data, options = [], selectOptions } = props;
    if (data.type === 'select') {
        return <Select {...props} />;
    } if (data.type === 'multi') {
        return <Multiple {...props} />;
    }
    return options.map((val, idx) => {
        if (data.type === 'radio') {
            return <Radio val={val} key={idx} data={data} selectOptions={selectOptions} />;
        } if (data.type === 'checkbox') {
            return <Checkbox val={val} key={idx} data={data} selectOptions={selectOptions} />;
        }

        return null;
    });
};

const Customize = (props) => {
    const {
        data, t, items, changeQty, generateBundlePrice, selectOptions, handleAddToCart, loading,
    } = props;
    const [qty, setQty] = React.useState(1);
    const styles = useStyles();
    const product = data && data.products ? data.products.items[0] : {};

    return (
        <>
            <Typography variant="h5" type="bold">
                Customize
                {' '}
                {product.name}
            </Typography>
            {
                items.length > 0 ? (
                    <div className={styles.customizeContainer}>
                        <div className="row">
                            <div className="col-xs-12 col-lg-12">
                                {items.map((val, idx) => (
                                    <div className="item-list" key={idx}>
                                        <Typography variant="label" type="bold">
                                            {val.title}
                                            <span className="required-label">
                                                *
                                            </span>
                                        </Typography>
                                        <GenerateOptionsSelect data={val} options={val.options} selectOptions={selectOptions} />
                                        <Typography variant="label" type="bold">
                                            {t('product:quantity')}
                                        </Typography>
                                        <ButtonQty
                                            value={1}
                                            onChange={(e) => changeQty(val.position, e)}
                                            max={10000}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="col-xs-12 col-lg-12" style={{ marginTop: 20 }}>
                                <Typography variant="label" type="bold">
                                    {t('product:yourCustomization')}
                                </Typography>
                                <hr />
                                <Typography variant="h3" type="bold">
                                    {generateBundlePrice(items)}
                                </Typography>
                                <ButtonQty
                                    value={1}
                                    onChange={(e) => setQty(e)}
                                    max={10000}
                                />
                                <Button
                                    className={styles.btnAddToCard}
                                    color="primary"
                                    onClick={() => handleAddToCart(qty)}
                                    loading={loading}
                                >
                                    <Typography
                                        align="center"
                                        type="bold"
                                        letter="uppercase"
                                        color="white"
                                        variant="span"
                                    >
                                        {t('product:addToCart')}
                                    </Typography>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : null
            }

        </>
    );
};

export default Customize;

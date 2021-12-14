import Label from '@common_productlabel';
import { modules } from '@config';
import useStyles from '@plugin_productitem/style';

const LabelView = (props) => {
    const {
        __typename, new_from_date, new_to_date, sale, isGrid = true,
        price_range, special_from_date, special_to_date, spesificProduct,
    } = props;
    const styles = useStyles();
    return (
        <div className={isGrid ? styles.badgesNewSales : styles.badgesNewSalesList}>
            <Label
                productType={__typename}
                newFromDate={new_from_date}
                newToDate={new_to_date}
                sale={sale}
                config={modules.catalog.productListing.label}
                priceRange={spesificProduct.price_range ? spesificProduct.price_range : price_range}
                specialFromDate={special_from_date}
                specialToDate={special_to_date}
                isGrid={isGrid}
            />
        </div>
    );
};

export default LabelView;

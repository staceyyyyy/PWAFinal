const CheckboxSettings = (props) => {
    const {
        t, value, data, setSettings, name, CheckboxView,
    } = props;
    const [checkData, setCheckData] = React.useState(value);
    const handleChange = (val) => {
        setCheckData(val);
        const settings = {};
        settings[name] = val.length === 1;
        setSettings({ ...settings });
    };
    return (
        <CheckboxView
            t={t}
            label={t('customer:setting:newsletter_subscription')}
            flex="column"
            data={data}
            value={checkData}
            onChange={handleChange}
        />
    );
};

export default CheckboxSettings;

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { GRAY_SECONDARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    tabs: {
        boxShadow: 'none',
        borderBottom: `1px solid ${GRAY_SECONDARY}`,
    },
}));

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

const CustomTabs = ({
    data = [],
    onChange,
    value,
    allItems = true,
    tabsProps = {},
    containerProps = {},
}) => {
    const styles = useStyles();
    const [localValue, setLocalValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setLocalValue(newValue);
    };
    return (
        <AppBar position="static" color="inherit" className={styles.tabs} {...containerProps}>
            <Tabs
                value={value || localValue}
                onChange={onChange || handleChange}
                variant="scrollable"
                scrollButtons="off"
                aria-label="scrollable prevent tabs example"
                {...tabsProps}
            >
                {
                    allItems && (<Tab label="All Item" {...a11yProps(0)} />)
                }
                {data.map((item, index) => {
                    const itemData = item.label ? item : { label: item };
                    return <Tab key={index} {...itemData} {...a11yProps(allItems ? index + 1 : index)} />;
                })}
            </Tabs>
        </AppBar>
    );
};

export default CustomTabs;

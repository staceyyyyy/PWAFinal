/* eslint-disable func-names */
import Router from 'next/router';

const noReload = ({
    action,
}) => {
    const getClassLink = document.getElementsByClassName('pwa-link');
    for (let i = 0; i < getClassLink.length; i += 1) {
        getClassLink[i].onclick = function (e) {
            e.preventDefault();
            const attribute = this.getAttribute('href');
            const type = this.getAttribute('type');
            if (!type) {
                Router.push(attribute);
            } else if (action) {
                action(type, attribute);
            } else {
                Router.push('/[...slug]', attribute);
            }
        };
    }
};

export default noReload;

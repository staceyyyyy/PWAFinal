/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Thumbor from '@common_image';
import Link from 'next/link';
import React from 'react';

const MenuChildren = ({ data, handleClick, generateLink }) => {
    const [active, setActive] = React.useState(0);
    const child = data[active];
    return (
        <>
            <div className="nav-column nav-column-left col-lg-2">
                {data.map((val, idx) => (
                    <Link key={idx} href={generateLink(val)[0]} as={generateLink(val)[1]}>
                        <a onClick={() => handleClick(val)} className={active === idx ? 'active' : ''} onMouseEnter={() => setActive(idx)}>
                            {val.name}
                        </a>
                    </Link>
                ))}
            </div>
            <div className="nav-column nav-column-right col-lg-10 row">
                <div className={`${child.image_path ? 'col-lg-9' : 'col-lg-12'} row`}>
                    {child.children.map((lvl3, id3) => (
                        <div className="col-lg-3" key={id3}>
                            <Link href={generateLink(lvl3)[0]} as={generateLink(lvl3)[1]}>
                                <a onClick={() => handleClick(lvl3)}>{lvl3.name}</a>
                            </Link>
                            <ul className="list-item__menu">
                                {lvl3.children.map((lvl4, id4) => (
                                    <li key={id4}>
                                        <Link href={generateLink(lvl4)[0]} as={generateLink(lvl4)[1]}>
                                            <a onClick={() => handleClick(lvl4)}>{lvl4.name}</a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {child.image_path ? (
                    <div className="col-lg-3">
                        <Thumbor
                            // eslint-disable-next-line no-nested-ternary
                            src={child.image_path}
                            className="img_cat"
                            width={960}
                            height={577}
                            quality={80}
                            alt={child.name}
                        />
                    </div>
                ) : null}
            </div>
            <style jsx>
                {`
                    .row {
                        margin: 0;
                    }
                    .nav-column-left {
                        background: #f3f3f3;
                        padding: 15px 10px;
                    }
                    .nav-column-right {
                        padding: 15px 0;
                    }
                    .list-item__menu a {
                        font-weight: normal;
                        padding-bottom: 5px;
                        padding-top: 0px;
                    }
                `}
            </style>
        </>
    );
};

export default MenuChildren;

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
const Maintenance = () => (
    <div className="error-container">
        <img className="img-logo" src="/assets/img/logo_white.png" />
        <img className="img-center" src="/assets/img/construction.png" />
        <div className="error-description">
            <p>We're to make our website better than over.</p>
            <p>Check back in a bit. we'll see you soon.</p>
        </div>
        <style jsx>
            {`
                .error-container {
                    min-height: 100vh;
                    width: 100vw;
                    background: #632b87;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 30px;
                    flex-direction: column;
                    position: relative;
                }
                .img-logo{
                    width: 200px;
                    margin-bottom: 50px;
                }
                .img-center {
                    margin-bottom: 80px;
                    width: 500px;
                    height: auto;
                }
                .error-description {
                    height: fit-content;
                    text-align: center;
                    margin: 0 auto;
                    color: #fff;
                    font-size: 26px;
                }
                p {
                    margin: 10px  0;
                }
                @media only screen and (max-width: 600px) {
                    .img-logo{
                        max-width: 100px;
                    }
                    .img-center {
                        width: 250px;
                        height: auto;
                    }
                    p {
                        font-size: 12px;
                    }
                }
            `}
        </style>
    </div>
);

export default Maintenance;

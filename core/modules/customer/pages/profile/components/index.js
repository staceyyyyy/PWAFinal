/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
import Button from '@common_button';
import Typography from '@common_typography';
import TextField from '@common_textfield';
import PasswordField from '@common_password';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Layout from '@layout_customer';

import classNames from 'classnames';
import { breakPointsUp } from '@helper_theme';
import useStyles from '@core_modules/customer/pages/profile/components/style';

const ProfileForm = (props) => {
    const styles = useStyles();
    const {
        t, formik, handleChangePhone, handleWa, phoneIsWa, setEditEmail,
        editEmail, setEditPass, editPass, updateCustomerStatus, changeCustomerPasswordStatus,
    } = props;
    const desktop = breakPointsUp('sm');
    return (
        <form className={classNames('col-md-6', styles.container)} onSubmit={formik.handleSubmit}>
            <TextField
                label={t('common:form:firstName')}
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                    !!(formik.touched.firstName && formik.errors.firstName)
                }
                errorMessage={
                    (formik.touched.firstName && formik.errors.firstName)
                    || null
                }
            />
            <TextField
                label={t('common:form:lastName')}
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                    !!(formik.touched.lastName && formik.errors.lastName)
                }
                errorMessage={
                    (formik.touched.lastName && formik.errors.lastName) || null
                }
            />

            <TextField
                label={t('common:form:phoneNumber')}
                name="phonenumber"
                value={formik.values.phonenumber}
                onChange={handleChangePhone}
                error={
                    !!(formik.touched.phonenumber && formik.errors.phonenumber)
                }
                errorMessage={
                    (formik.touched.phonenumber && formik.errors.phonenumber) || null
                }
                footer={(
                    <FormControlLabel
                        onChange={handleWa}
                        className={styles.checkWa}
                        control={<Checkbox name="whastapptrue" color="primary" size="small" />}
                        label={<Typography variant="p">{t('customer:isWhatsapp')}</Typography>}
                    />
                )}
            />
            {!phoneIsWa && (
                <TextField
                    label={`${t('common:form:phoneNumber')} Whatsapp`}
                    name="whatsapp_number"
                    value={formik.values.whatsapp_number}
                    onChange={formik.handleChange}
                    error={!!(formik.touched.whatsapp_number && formik.errors.whatsapp_number)}
                    errorMessage={(formik.touched.whatsapp_number && formik.errors.whatsapp_number) || null}
                />
            )}
            <FormControlLabel
                className={styles.checkboxLabel}
                onChange={() => setEditEmail(!editEmail)}
                control={(
                    <Checkbox
                        checked={editEmail}
                        name="emailCheckbox"
                        color="primary"
                        size="medium"
                    />
                )}
                label={(
                    <Typography variant="span">
                        {t('common:button:change')}
                        {' '}
                        Email
                    </Typography>
                )}
            />

            <FormControlLabel
                className={styles.checkboxLabel}
                onChange={() => setEditPass(!editPass)}
                control={(
                    <Checkbox
                        checked={editPass}
                        name="passwordCheckbox"
                        color="primary"
                        size="medium"
                    />
                )}
                label={(
                    <Typography variant="span">
                        {t('common:button:change')}
                        {' '}
                        Password
                    </Typography>
                )}
            />

            <div className={styles.editContainer}>
                <div className={editEmail ? 'show' : 'hide'}>
                    <TextField
                        label="Email"
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.email && formik.errors.email)
                        }
                        errorMessage={
                            (formik.touched.email && formik.errors.email) || null
                        }
                    />
                </div>
                <div className={editEmail || editPass ? 'show' : 'hide'}>
                    <PasswordField
                        label={t('common:form:currentPassword')}
                        showVisible
                        name="currentPassword"
                        value={formik.values.currentPassword}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.currentPassword
                            && formik.errors.currentPassword)
                        }
                        errorMessage={
                            (formik.touched.currentPassword
                                && formik.errors.currentPassword)
                            || null
                        }
                    />
                </div>
                <div className={editPass ? 'show' : 'hide'}>
                    <PasswordField
                        label="Password"
                        showVisible
                        showPasswordMeter
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.password && formik.errors.password)
                        }
                        errorMessage={
                            (formik.touched.password
                                && formik.errors.password)
                            || null
                        }
                    />
                    <TextField
                        label={t('common:form:confirm')}
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={
                            !!(formik.touched.confirmPassword
                            && formik.errors.confirmPassword)
                        }
                        errorMessage={
                            (formik.touched.confirmPassword
                                && formik.errors.confirmPassword)
                            || null
                        }
                    />
                </div>
            </div>

            <div className={styles.bottomButtons}>
                <Button
                    fullWidth={!desktop}
                    type="submit"
                    loading={updateCustomerStatus.loading || changeCustomerPasswordStatus.loading}
                    align={desktop ? 'left' : 'center'}
                >
                    <Typography letter="capitalize" color="white" type="bold">
                        {t('common:button:save')}
                    </Typography>
                </Button>
            </div>
        </form>
    );
};

const ProfilePage = (props) => {
    const { data } = props;

    return (
        <Layout {...props}>
            <ProfileForm
                {...props}
                data={data.customer}
            />
        </Layout>
    );
};

export default ProfilePage;

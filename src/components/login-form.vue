<template>
    <BaseForm @submit="submit" class="login-form">
        <LoginFieldset :errors="errors" @input="setFormData" />
        <BaseFormBtn class="login-form__btn" type="submit">Войти</BaseFormBtn>
    </BaseForm>
</template>

<script>
import BaseForm from "./base-form.vue";
import LoginFieldset from "./login-fieldset.vue";
import BaseFormBtn from "./base-form-btn.vue";
export default {
    name: "LoginForm",
    components: {
        BaseForm,
        LoginFieldset,
        BaseFormBtn,
    },
    data() {
        return {
            formData: {
                login: {
                    value: "",
                    minLength: 3,
                    validator: /^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/i,
                    errorsMessages: {
                        minLength: "Длина логина менее 3 символов",
                        validation: "Некорректный логин",
                    },
                },
                password: {
                    value: "",
                    minLength: 5,
                    errorsMessages: {
                        minLength: 'Длина пароля менее 5 символов'
                    }
                },
            },
            errors: {
                login: {
                    errorsState: false,
                    minLength: {
                        state: false,
                        message: "",
                    },
                    validation: {
                        state: false,
                        message: "",
                    },
                },
                password: {
                    errorsState: false,
                    minLength: {
                        state: false,
                        message: "",
                    },
                },
            },
        };
    },
    watch: {
        "formData.login.value": {
            handler() {
                this.checkFormData("login");
            },
        },
        'formData.password.value': {
            handler() {
                this.checkFormData('password');
            }
        }
    },
    methods: {
        submit(event) {
            if (!this.checkFormData('password') && !this.checkFormData('login')) {
                alert('ok')
            } else {
                alert('notOk');
            }
        },
        setFormData(e) {
            if (e.target === "login") {
                this.formData.login.value = e.value;
            } else {
                this.formData.password.value = e.value;
            }
        },
        checkFormData(target) {
            const targetData = this.formData[target];
            const validateObj = {};
            if ("minLength" in targetData) {
                if (typeof targetData.minLength !== "number") {
                    throw new Error(
                        `Min Length value is not a number \n Value: ${targetData.minLength}`
                    );
                }
                validateObj.minLength = this.checkFormDataLength(target);
            }
            if ("validator" in targetData) {
                if (
                    targetData.validator.__proto__.constructor.name !== "RegExp"
                ) {
                    throw new Error(
                        `Validator value is not a regexp \n Value: ${targetData.validator}`
                    );
                }
                validateObj.validation = this.validateFormData(target);
            }
            this.setErrorsMessages(target, validateObj);
            return this.setErrorsState(target, validateObj);
        },
        checkFormDataLength(target) {
            const targetData = this.formData[target];

            if (targetData.value.length < targetData.minLength) return true;
            return false;
        },
        setErrorsState(target, validateObj) {
            const errorsTarget = this.errors[target];
            let errors = Object.keys(validateObj);
            let errorsState = false;
            errors.forEach((error) => {
                if (error in errorsTarget) {
                    errorsTarget[error].state = validateObj[error];
                    if (validateObj[error]) {
                        errorsState = true;
                    }
                    if (!validateObj[error] && !errorsState) {
                        errorsState = false;
                    }
                } else {
                    throw new Error(`${key} does not exist in errors object`);
                }
            });
            errorsTarget.errorsState = errorsState;
            return errorsState;
        },
        setErrorsMessages(target, validateObj) {
            const errorsTarget = this.errors[target];
            const targetData = this.formData[target];
            let errors = Object.keys(validateObj);
            errors.forEach((error) => {
                if (error in errorsTarget) {
                    errorsTarget[error].message =
                        targetData?.errorsMessages[error];
                } else {
                    throw new Error(`${error} does not exist in errors object`);
                }
            });
        },
        validateFormData(target) {
            const targetData = this.formData[target];

            if (!targetData.value.match(targetData.validator)) return true;

            return false;
        },
    },
};
</script>

<style lang="sass">
.login-form
    font-size: 18px
    &__btn
        margin-top: 2.8333em
        text-transform: uppercase
        font-weight: bold
        text-align: center
</style>
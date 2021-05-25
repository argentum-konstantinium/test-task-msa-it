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
import { mapActions } from 'vuex';
import api from "../assets/js/api.js";
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
                        minLength: "Длина пароля менее 5 символов",
                    },
                },
            },
            errors: {
                login: {
                    errorsState: null,
                    errors: {
                        minLength: {
                            state: false,
                            message: "",
                        },
                        validation: {
                            state: false,
                            message: "",
                        },
                    },
                },
                password: {
                    errorsState: null,
                    errors: {
                        minLength: {
                            state: false,
                            message: "",
                        },
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
        "formData.password.value": {
            handler() {
                this.checkFormData("password");
            },
        },
    },
    methods: {
        ...mapActions(['authorizeUser']),
        submit: async function (event) {
            const passwordState = this.checkFormData("password");
            const loginState = this.checkFormData("login");
            const formData = this.formData;
            const submitData = this.prepareDate(formData);
            
            if (!passwordState && !loginState) {
                /* response = await fetch("", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: submitData,
                }); */
                const response = await api.checkAuthData(submitData);
                this.processResponse(response);
            } else {
                return;
            }
        },
        setFormData(e) {
            if (e.target === "login") {
                this.formData.login.value = e.value.trim();
            } else {
                this.formData.password.value = e.value.trim();
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
                if (error in errorsTarget.errors) {
                    errorsTarget.errors[error].state = validateObj[error];
                    if (validateObj[error]) {
                        errorsState = true;
                    }
                    if ((validateObj[error] === false) && (errorsState === false)) {
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
                if (error in errorsTarget.errors) {
                    errorsTarget.errors[error].message =
                        targetData.errorsMessages[error];
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
        prepareDate(formData) {
            const formDataKeys = Object.keys(formData);
            let submitData = {};
            formDataKeys.forEach((key) => {
                submitData[key] = formData[key].value;
            });
            submitData = JSON.stringify(submitData);
            return submitData;
        },
        processResponse(response) {
            if (response) {
                this.authorizeUser(response);
            }
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
@media ( min-width: 600px )
    .login-form
        max-width: 550px
        border-radius: 15px
        background: #fff
        margin: 0 auto
        padding: 30px
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5)
</style>
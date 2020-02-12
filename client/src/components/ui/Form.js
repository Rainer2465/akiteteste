import React from 'react';
const Form = (props) => {
    return (
        <div>
            <form>
                <div class="form-row align-items-center">
                    {props._formItens.map((item) => {
                        return (
                            <div class="col-auto">
                                <label class="sr-only" for="inlineFormInput">{item.label}</label>
                                <input type={item.tipo} class="form-control mb-2" id="inlineFormInput" placeholder={item.placeholder} />
                            </div>
                        );
                    }
                    )}
                    {console.log(props)}
                    <div class="col-auto">
                        <button type="submit" class="btn btn-primary mb-2">{props._botaoTexto}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
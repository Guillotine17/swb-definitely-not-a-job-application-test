import {useState} from 'react';
import {useTranslation} from "react-i18next";
import { allValidations } from './validations';

// clears the confirm on a mismatch submission.
// 
const CLEAR_CONFIRM_ON_MISMATCH = true;

const { minLength, 
        containsUpperCase, 
        containsLowerCase, 
        containsNumber, 
        onlyValidCharacters, 
        containsSpecialCharacter, 
        passwordsMatch } = allValidations;

// test functions
const testList = [
    {testName: "minimumlength", testFunction: minLength},
    {testName: "containsUpperCase", testFunction: containsUpperCase},
    {testName: "containsLowerCase", testFunction: containsLowerCase},
    {testName: "containsNumber", testFunction: containsNumber},
    {testName: "containsSpecialCharacter", testFunction: containsSpecialCharacter},
    {testName: "onlyValidCharacters", testFunction: onlyValidCharacters},
    {testName: "passwordsMatch", testFunction: passwordsMatch},
];


const PasswordForm = () => {
    const {t} = useTranslation('common');
    const [success, setSuccess] = useState(false)
    const [field1Value, setField1] = useState('');
    const [field2Value, setField2] = useState('');
    const [feedback, setFeedback] = useState([]);
    function clearSuccess() {
        setSuccess(false);
    }
    function validatePasswords(event) {
        if (event) event.preventDefault();
        setField1(field1Value.trim());
        setField2(field2Value.trim());
        const tempFeedback = testList.map(({testName, testFunction}) => {
            return {testName, result: testFunction({testString: field1Value, testString2: field2Value})}
        });
        // clear pw2 if they dont match?
        if (CLEAR_CONFIRM_ON_MISMATCH && !tempFeedback[tempFeedback.length-1].result) setField2('');
        if (tempFeedback.filter(({result}) => !result).length === 0) setSuccess(true);
        setFeedback(tempFeedback);
    }
    return (
        <div className="page-container">
            <form onSubmit={(e) => {e.preventDefault()}} className="form-container">
                <div>
                    <PasswordField 
                        changeCallback={(e) => {
                            clearSuccess();
                            setField1(e.target.value);
                        }}
                        fieldValue={field1Value}
                        labelKey={'password'}
                        revealable={true}
                        />
                    <PasswordField
                        changeCallback={(e) => {
                            clearSuccess();
                            setField2(e.target.value);
                        }}                        fieldValue={field2Value}
                        labelKey={'confirmPassword'}
                        revealable={false}
                        />
                    <div>
                    {/* <button type="submit" style={{display: 'none'}} onSubmit={(e) => validatePasswords(e)}></input> */}
                    <button className="submit-button" type="submit" onClick={(e) => validatePasswords()}>{t('submit')}</button>
                    </div>
                </div>
                {/* {feedback.length > 0 && (<FeedBackList feedback={feedback}/>)} */}
            </form>
            <FeedBackList feedback={feedback} success={success}/>
        </div>
    )
}

const PasswordField = ({changeCallback, fieldValue, labelKey, revealable}) => {
    const {t} = useTranslation('common');
    const [masked, setMasked] = useState(true);
    return (
        <div className="password-row">
            <div className="password-header">
                <div>{t(labelKey)}</div>
                {revealable ? <div className="mask-toggle" onClick={() => setMasked(!masked)}>{masked ? t('showPassword') : t('hidePassword')}</div> : <div/>}
            </div>
            <input autoComplete="new-password" className={`password-field`}  type={masked ? 'password' : 'text'} onChange={(e) => changeCallback(e)} value={fieldValue}></input>
        </div>
    )
}

const FeedBackList = ({feedback, success}) => {
    const {t} = useTranslation('common');
    return (
        <div className="feedback-container">
            {feedback.map(({result, testName}, i) => {
                return (
                    <div className={`feedback-row ${result ? 'success':'error'}`} key={i}>
                        <div style={{fontWeight: 'Bold'}}>{result ? '✓' : '✗' }</div>
                        <div>{t(testName)}</div>
                    </div>
                )
            })}
            {success === true && (<h1 className="success">{t('successfulSubmission')}</h1>)}
        </div>
    )
}

export default PasswordForm;
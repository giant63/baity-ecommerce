import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Collapse,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { Checkbox, CheckboxGroup } from 'react-checkbox-group';
import Loading from "commons/Loading";
import FormUtils from 'components/FormUtils'
import bayty_icon from 'assets/img/bayty_icon1.png';
import logo_placeholder from 'assets/img/logo-placeholder.jpg';
import styled from 'styled-components';

const UserImg = styled.img`
width: 150px;
height: 150px;
border-radius: 50%; 
display:block;
margin:auto;
@media only screen and (max-width: 767px) {
width: 80px;
height: 80px;
}`;

const UserHomeImg = styled.img`
width: 60%;
height: 150px;
display:block;
margin:auto;
@media only screen and (max-width: 767px) {
height: 100px;
}`;

function FieldGroup({ id, label, help, validationState, firstTime, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl  {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}


const SelectGroup = ({ id, label, selectedOption, ...props }) => (
  <FormGroup controlId={id}>
    <hr />
    <ControlLabel>{label} </ControlLabel>
    <FormControl
      componentClass="select"
      placeholder={props.placeholder}
      name={props.name}
      value={selectedOption}
      onChange={props.onChange}
    >
      {props.options.map(opt => {
        return (
          <option key={opt.key} value={opt.value}>
            {opt.value}
          </option>
        );
      })}
    </FormControl>
  </FormGroup>
);

const FIELDS = {
  businessName: {
    type: 'text',
    label: 'اسم الشركة أو المؤسسة',
    valid: false,
    touched: false,
    required: true,
    errorMessage: FormUtils.bussNameErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.bussNameValid
  },
  city: {
    type: 'select',
    label: 'مقر الشركة أو المؤسسة',
    valid: true,
    touched: false,
    required: true,
    errorMessage: "",
    helpMsg: "",
    value: "الرياض",
    options: FormUtils.BusinessProfileOptions.cities.map((city) => {
      return { key: city.id, value: city.name_ar };
    })
  },
  phone: {
    type: 'tel',
    label: 'رقم الهاتف',
    placeholder: '05XXXXXXXX',
    valid: false,
    touched: false,
    required: true,
    errorMessage: FormUtils.phoneNoErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.phoneNoValid
  },
  logo: {
    type: 'image',
    label: 'لوقو الشركة',
    valid: false,
    touched: false,
    required: false,
    errorMessage: "",
    helpMsg: "",
    value: ""
  },
  homeImgUrl: {
    type: 'image',
    label: ' صورة ملف الشركة',
    valid: false,
    touched: false,
    required: false,
    errorMessage: "",
    helpMsg: "",
    value: ""
  },
  preview: {
    type: 'textarea',
    label: 'نبذة عن الشركة',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussDescErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.bussDescValid
  },
  website: {
    type: 'text',
    label: 'موقع الشركة على الانترنت',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussWebsiteErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.bussWebsiteValid
  },
  twitter: {
    type: 'text',
    label: 'حساب الشركة على تويتر',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussTwitterErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.bussTwitterValid
  },
  facebook: {
    type: 'text',
    label: 'حساب الشركة على فيسبوك',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussFacebookErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.bussFacebookValid
  },
  instagram: {
    type: 'text',
    label: 'حساب الشركة على انستاقرام',
    valid: false,
    touched: false,
    required: false,
    errorMessage: FormUtils.bussInstagramErrorMsg,
    helpMsg: "",
    value: "",
    onChangeValidation: FormUtils.bussInstagramValid
  },
  types: {
    type: 'checkbox',
    label: ' نوع العمل * ',
    valid: false,
    touched: false,
    required: true,
    errorMessage: "",
    helpMsg: "",
    value: [],
    options: FormUtils.BusinessProfileOptions.businessTypes
  },
  categories: {
    type: 'checkbox',
    label: ' التصنيف *',
    valid: false,
    touched: false,
    required: true,
    errorMessage: "",
    helpMsg: "",
    value: [],
    options: FormUtils.BusinessProfileOptions.businessCategories
  },
  addServices: {
    type: 'text',
    label: 'خدمات اضافية',
    valid: false,
    touched: false,
    required: false,
    errorMessage: "",
    helpMsg: "",
    value: ""
  }
}

class ProfProfileForm extends Component {
  constructor(args) {
    super(args);
    let fields = { ...FIELDS }
    _.forEach(fields, (fieldData, fieldName) => { //element value, element key in object
      fieldData.value = this.props.profile[fieldName] || ''
    });
    this.state = {
      FIELDS: fields,
      homeImgUrl: this.props.profile.homeImgUrl,
      imgUrl: this.props.profile.imgUrl,//TODO: this should be part of the fields
      formStatusAlert: {
        alert: false,
        type: "info",
        alertMsg: "",
        showSuccessfulSubmit: false
      }
    }

    this.handleLogoUpload = this.handleLogoUpload.bind(this);
    this.handleHomeImgUpload = this.handleHomeImgUpload.bind(this);
    this.updateState = this.updateState.bind(this);
    this.renderInputField = this.renderInputField.bind(this);
    this.renderTextareaField = this.renderTextareaField.bind(this);
    this.renderSelectField = this.renderSelectField.bind(this);
    this.renderCheckboxFieldGroup = this.renderCheckboxFieldGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.packageDataForSubmission = this.packageDataForSubmission.bind(this)
    this.validateFields = this.validateFields.bind(this)
  }

  //updates data for one field
  updateState(fieldInfo, fieldName) {
    let newStateFields = { FIELDS: { ...this.state.FIELDS } };
    newStateFields.FIELDS[fieldName] = fieldInfo
    this.setState(newStateFields)
  }

  validateField(name, value) {
    let fieldData = { ...this.state.FIELDS[name] };
    //update state
    fieldData.value = value;
    fieldData.touched = true;
    if (FIELDS[name].onChangeValidation)
      fieldData.valid = FIELDS[name].onChangeValidation(value) ? true : false;
    else
      fieldData.valid = true;
    return fieldData;
  }

  handleChange(e) {
    //name of the field
    const name = e.target.name;
    //value of the field (for a text field the text inside it, for a select the selected value)
    let value = e.target.value;
    value = FormUtils.hindiToArabicDigits(value)
    let fieldData = this.validateField(name, value);
    this.updateState(fieldData, name)
  }

  handleCheckboxChange(...args) {
    const name = args[2]
    const value = args[0]//an array of selected options
    let fieldInfo = { ...this.state.FIELDS[name] };
    fieldInfo.value = value
    this.updateState(fieldInfo, name)
  }

  handleLogoUpload(e) {
    e.preventDefault();
    if (!e.target.files.length > 0)//user canceled selecting a file
      return
    this.setState({ imgUrl: e.target.files[0] });

    let reader = new FileReader();
    let imgUrl = e.target.files[0];
    //  let file = e.target.files[0];
    let imageMaxSize = 1024 * 1024;//1MB
    if (imgUrl.size > imageMaxSize) {
      var nBytes = imgUrl.size;
      var sOutput = nBytes + " bytes"
      for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple];
      }
      this.setState({
        imgError: true,
        imgErrorMessage: 'يجب أن يكون حجم الصورة أقل من ١ ميجابايت. حجم الملف الحالي هو: ' + sOutput
      })
      return;
    } else if (!imgUrl.type.startsWith('image/jpeg') && !imgUrl.type.startsWith('image/png')) {
      this.setState({
        imgError: true,
        imgErrorMessage: 'يجب أن يتم تحميل صورة من نوع JPEG/PNG'
      })
      return;
    }
    reader.onloadend = () => {
      this.setState({
        imgFile: imgUrl,//of type File that can be directly uploaded to firebase storage using "put" method
        imgUrl: reader.result,
        imgError: false,
        imgErrorMessage: ''
      }
      );
    }
    reader.readAsDataURL(imgUrl)
  }

  handleHomeImgUpload(e) {
    e.preventDefault();
    if (!e.target.files.length > 0)//user canceled selecting a file
      return
    this.setState({ homeImgUrl: e.target.files[0] });
    let reader = new FileReader();
    let homeImgUrl = e.target.files[0]
    //  let file = e.target.files[0];

    let imageMaxSize = 1024 * 1024;//1MB
    if (homeImgUrl.size > imageMaxSize) {
      var nBytes = homeImgUrl.size;
      var sOutput = nBytes + " bytes"
      for (var aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(3) + " " + aMultiples[nMultiple];
      }
      this.setState({
        imgError: true,
        imgErrorMessage: 'يجب أن يكون حجم الصورة أقل من ١ ميجابايت. حجم الملف الحالي هو: ' + sOutput
      })
      return;
    } else if (!homeImgUrl.type.startsWith('image/jpeg') && !homeImgUrl.type.startsWith('image/png')) {
      this.setState({
        imgError: true,
        imgErrorMessage: 'يجب أن يتم تحميل صورة من نوع JPEG/PNG'
      })
      return;
    }
    reader.onloadend = () => {
      this.setState({
        imgHomeFile: homeImgUrl,//of type File that can be directly uploaded to firebase storage using "put" method
        homeImgUrl: reader.result,//of type Data URL for preview purposes only see (https://en.wikipedia.org/wiki/Data_URI_scheme & https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)
        imgError: false,
        imgErrorMessage: ''
      });
    }
    reader.readAsDataURL(homeImgUrl)
  }

  validateFields() {
    //first validate field, set valid properties and error messages
    let newValidationState = _.reduce(this.state.FIELDS,
      (newState, fieldData, fieldName) => { //result, value, key
        let newFieldData = this.validateField(fieldName, fieldData.value);
        newState[fieldName] = newFieldData;
        return newState;
      },
      {});
    return newValidationState;
  }

  validateForm() {
    //then compute form validation
    let formValid = _.reduce(this.state.FIELDS,
      (formValid, field) => { //result, value, key
        if (field.type === 'checkbox' && field.required)
          return formValid && field.value.length > 0;
        //field not required and empty so ignore
        else if (['text', 'tel', 'textarea'].includes(field.type) && !field.required && field.value.length === 0)
          return formValid;
        //field not touched and has value (from DB), it is valid
        else if (!field.touched && field.value && field.value.length > 0)
          return formValid;
        else
          return formValid && (field.valid || !field.required);
      },
      true);
    return formValid;
  }

  packageDataForSubmission() {
    var profileData = _.reduce(this.state.FIELDS,
      (profileData, fieldData, fieldName) => {
        profileData[fieldName] = fieldData.value;
        return profileData
      }, {});
    return profileData;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ FIELDS: this.validateFields() },//first validate fields to touch all of them
      this.setState({ formValid: this.validateForm() }, () => {
        if (this.state.formValid) {
          //remove any error messages in the form
          this.setState({
            formStatusAlert: {
              alert: false,
              type: "info",
              alertMsg: "",
              showSuccessfulSubmit: true
            }
          })
          //package data for update
          let profileData = this.packageDataForSubmission();
          profileData.imgUrl = this.state.imgUrl;
          profileData.imageFile = this.state.imgFile;
          profileData.newImage = this.state.imgUrl !== this.props.profile.imgUrl;
          profileData.homeImgUrl = this.state.homeImgUrl;
          profileData.imageHFile = this.state.imgHomeFile;
          profileData.newHImage = this.state.homeImgUrl !== this.props.profile.homeImgUrl;
          //update
          this.props.onSubmit(profileData,
            (error) => {
              console.log(error)
              this.setState({
                formStatusAlert: {
                  alert: true,
                  type: "danger",
                  alertMsg: "حدث خطأ أثناء التحديث : " + error,
                  showSuccessfulSubmit: false
                }
              })
              ReactDOM.findDOMNode(this).scrollTop = 0;
            })
        } else {// form is not valid
          this.setState({
            formStatusAlert: {
              alert: true,
              type: "danger",
              alertMsg: " عذرا ! يجب تعبئة المعلومات المطلوبة في النموذج مع الصورة بحيث تكون البيانات المعطاة صحيحة حسب المطلوب",
              showSuccessfulSubmit: false
            }
          })
          ReactDOM.findDOMNode(this).scrollIntoView();
        }
      })
    );
  }

  //outputs validatin state of a field (valid, not valid, neutral since it is not touched yet)
  validationState(touched, validFlag, required, value) {
    if (!touched || (!required && (value === undefined || value.length === 0))) return null;
    else if (validFlag) return "success";
    else return "error";
  }

  renderInputField(fieldConfig, fieldName) {
    return (<FieldGroup
      key={fieldName}
      name={fieldName}
      componentClass='input'
      type={fieldConfig.type || null}
      label={fieldConfig.label}
      placeholder={fieldConfig.placeholder || null}
      onChange={this.handleChange}
      value={this.state.FIELDS[fieldName].value || ''}
      help={
        !fieldConfig.touched || (!fieldConfig.required && (fieldConfig.value === undefined || fieldConfig.value.length === 0)) ||
          fieldConfig.valid
          ? fieldConfig.helpMsg || ''
          : fieldConfig.errorMessage || ''
      }
      validationState={this.validationState(
        fieldConfig.touched,
        fieldConfig.valid,
        fieldConfig.required,
        fieldConfig.value
      )}
    />);
  }

  renderTextareaField(fieldConfig, fieldName) {
    return (<FieldGroup
      key={fieldName}
      name={fieldName}
      componentClass='textarea'
      label={fieldConfig.label}
      placeholder={fieldConfig.placeholder || ''}
      onChange={this.handleChange}
      value={this.state.FIELDS[fieldName].value || ''}
      help={
        !fieldConfig.touched || (!fieldConfig.required && (fieldConfig.value === undefined || fieldConfig.value.length === 0)) ||
          fieldConfig.valid
          ? fieldConfig.helpMsg || ''
          : fieldConfig.errorMessage || ''
      }
      validationState={this.validationState(
        fieldConfig.touched,
        fieldConfig.valid,
        fieldConfig.required,
        fieldConfig.value
      )}
    />);
  }

  renderSelectField(fieldConfig, fieldName) {
    return (<SelectGroup
      key={fieldName}
      name={fieldName}
      componentClass='select'
      label={fieldConfig.label}
      onChange={this.handleChange}
      options={fieldConfig.options}
      selectedOption={this.state.FIELDS[fieldName].value}
    />);
  }

  renderCheckboxFieldGroup(fieldConfig, fieldName) {
    return (
      <FormGroup key={'formGroup' + fieldName}>
        <ControlLabel key={'label' + fieldName} className="border-bottom-1" >
          {fieldConfig.label}
        </ControlLabel>

        <CheckboxGroup
          key={'formgroup' + fieldName}
          name={fieldName}
          value={this.state.FIELDS[fieldName].value}
          onChange={this.handleCheckboxChange}>
          <Row style={{ display: 'flex', flexWrap: 'wrap' }} key={'row' + fieldName}>
            {
              fieldConfig.options.map((checkbox) => {
                return (
                  <Col key={"Col" + checkbox[0]} xs={6} sm={4}>
                    <label className="form-check-label"><Checkbox value={checkbox[1]} key={checkbox[0]} />
                      {'  ' + checkbox[1]}
                    </label>
                  </Col>
                )
              })
            }
          </Row>
        </CheckboxGroup>
      </FormGroup>
    );
  }

  /*
    render the field in a form based on an object that
    describes the fields info. Note that currently we
    do not render the fields in a specific order
  */
  renderField(fieldConfig, fieldName) {
    if (['text', 'tel'].includes(fieldConfig.type)) {
      return this.renderInputField(fieldConfig, fieldName)
    } else if (fieldConfig.type === 'textarea') {
      return this.renderTextareaField(fieldConfig, fieldName)
    } else if (fieldConfig.type === 'select') {
      return this.renderSelectField(fieldConfig, fieldName)
    } else if (fieldConfig.type === 'checkbox') {
      return this.renderCheckboxFieldGroup(fieldConfig, fieldName)
    }
  }

  authWithEmailPassword(event) {
    event.preventDefault()
    this.setState({ redirect: true })
  }

  render() {
    var loading = false;
    const { from } = { from: { pathname: '/myprofile' } }
    const { redirect } = this.state

    if (redirect) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div>
        <form
          onSubmit={event => this.authWithEmailPassword(event)}
          ref={form => {
            this.profForm = form;
          }}
        >
          <div className="loginregtitle">
            <img src={bayty_icon} alt=""/>
            <h2 style={{ color: 'rgb(26,156,142)' }}>بيانات الحساب</h2>
          </div>
          {loading ? (
            <Loading />
          ) : (
              <Collapse in={this.state.formStatusAlert.alert}>
                <Alert bsStyle={this.state.formStatusAlert.type}>
                  {this.state.formStatusAlert.alertMsg
                  }
                </Alert>
              </Collapse>
            )}
          <Row>
            <Col lg={12} >

              {this.state.homeImgUrl
                ? <UserHomeImg src={this.state.homeImgUrl} />
                : <UserHomeImg src={logo_placeholder} />
              }
            </Col>

            <Col lg={12}>
              <div style={{ margin: '10px auto 30px', textAlign: 'center' }}>
                <label style={{ cursor: 'pointer' }} htmlFor="profile_h_pic"><span style={{ color: 'green' }}>+&nbsp;</span>
                  {this.state.homeImgUrl && this.state.homeImgUrl.length > 0
                    ? "عدل صورة صفحة الشركة"
                    : "أضف صورة صفحة الشركة"
                  }
                  &nbsp;&nbsp;</label>
                {this.state.imgError
                  ? <span className="help-block" style={{ fontSize: '100%', color: 'red' }}>تقبل الصور من نوع JPEG/JPG وحجم أقل من 1 ميجابايت 1MB</span>
                  : <span className="help-block" style={{ fontSize: '80%' }}>تقبل الصور من نوع JPEG/JPG/PNG وحجم أقل من 1 ميجابايت </span>
                }
                <input type="file" id="profile_h_pic" name="homeImgUrl"
                  accept="image/jpeg, image/png" style={{ opacity: 0 }} onChange={this.handleHomeImgUpload} />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} >
              {this.state.imgUrl
                ? <UserImg src={this.state.imgUrl} />
                : <UserImg src={logo_placeholder} />
              }
            </Col>

            <Col lg={12}>
              <div style={{ margin: '10px auto 30px', textAlign: 'center' }}>
                <label style={{ cursor: 'pointer' }} htmlFor="profile_pic"><span style={{ color: 'green' }}>+&nbsp;</span>
                  {this.state.imgUrl && this.state.imgUrl.length > 0
                    ? "عدل شعار الشركة"
                    : "أضف شعار الشركة"
                  }
                  &nbsp;&nbsp;</label>
                {this.state.imgError
                  ? <span className="help-block" style={{ fontSize: '100%', color: 'red' }}>تقبل الصور من نوع JPEG/JPG وحجم أقل من 1 ميجابايت 1MB</span>
                  : <span className="help-block" style={{ fontSize: '80%' }}>تقبل الصور من نوع JPEG/JPG/PNG وحجم أقل من 1 ميجابايت </span>
                }
                <input type="file" id="profile_pic" name="imgUrl"
                  accept="image/jpeg, image/png" style={{ opacity: 0 }} onChange={this.handleLogoUpload} />
              </div>
            </Col>
          </Row>

          {
            _.map(this.state.FIELDS, this.renderField.bind(this))
          }
          <button type="submit" onClick={this.handleSubmit}>تحديث الحساب</button>
          <button>إلغاء</button>
        </form>
      </div>
    );
  }
}

export default ProfProfileForm;

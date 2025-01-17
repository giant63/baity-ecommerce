import React, { Component } from "react";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Collapse,
  Alert, Modal
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import FaCheckCircleO from 'react-icons/lib/fa/check-circle-o'
import FaTimesCircleO from 'react-icons/lib/fa/times-circle-o'
import ImagePreviewsContainer from 'components/ImagePreviewsContainer'
import _ from 'lodash'
import MyProgressBar from 'commons/MyProgressBar'




function FieldGroup({ id, label, help, validationState, firstTime, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
      <FormControl.Feedback />
    </FormGroup>
  );
}

const SelectGroup = ({ id, label, selectedOption, ...props }) => (
  <FormGroup controlId={id}>
    <ControlLabel>{label}</ControlLabel>
    <FormControl
      componentClass="select"
      placeholder={props.placeholder}
      name={props.name}
      value={selectedOption}
      onChange={props.onChange}
    >
      {props.options.map(opt => {
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </FormControl>
  </FormGroup>
);

const Style = [
  "كلاسيكي",
  "معاصر",
  "تقليدي",
  "ريفي",
  "اسكندنافي",
  "مكتبي",
  "جلسات خارجية",
  "تراثي",
  "أمريكي",
  "أوروبي"
];

const DepartmentList = [
  "صالات",
  "مجالس",
  "غرف النوم",
  "مطابخ وأواني",
  "غرف الطعام",
  "دورات المياه",
  "الأثاث",
  "المخازن",
  "جلسات خارجية",
  "أرضيات",
  "غرف أطفال",
  "مكاتب منزلية"
];

var CategoryList = [
  "خزائن الكتب",
  "سجاد",
  "كراسي",
  "كنب",
  "طاولات",
  "الاكسسوارات والديكور",
  "أبجورات",
  "طاولات تلفزيون",
  "لوحات",
  "ستائر"
];
// livingroom
const CategoryListLivingroom = [
  "خزائن الكتب",
  "سجاد",
  "كراسي",
  "كنب",
  "طاولات",
  "الاكسسوارات والديكور",
  "أبجورات",
  "طاولات تلفزيون",
  "لوحات",
  "ستائر"
];
// setting room
const CategoryListSettingroom = [
  "سجاد",
  "كراسي",
  "كنب",
  "طاولات",
  "الاكسسوارات والديكور",
  "أبجورات",
  "لوحات",
  "ستائر"
];
//bedroom
const CategoryListBedroom = [
  "سرير",
  "فراش",
  "الاكسسوارات والديكور",
  "خزائن الملابس",
  "أدراج",
  "تسريحة",
  "غرف الملابس",
  "إضاءة",
  "كراسي"
];
//kitchen
const CategoryListKitchen = [
  "مطابخ",
  "إضاءة المطابخ",
  "أواني منزلية"
];
// diningroom
const CategoryListDining = [
  "طاولات طعام",
  "خزائن غرف الطعام",
  "كراسي طعام"
];
//bathroom
const CategoryListBath = [
  "الاستحمام",
  "مغاسل",
  "مخازن دورات المياه",
  "إضاءة دورات المياه",
  "صنابير",
  "إكسسوارات دورات المياه",
  "مناشف",
  "مراحيض"
];

// Furnture
const CategoryListFurn = [
  "خزائن الكتب",
  "سجاد",
  "كراسي",
  "كنب",
  "طاولات",
  "الإكسسوارات والديكور",
  "أبجورات",
  "طاولات تلفزيون",
  "إضاءة",
  "لوحات",
  "ستائر"
];
// garden
const CategoryListGarden = [
  "كراسي الحديقة",
  "طاولات طعام خارجية",
  "أرجوحات",
  "المظلات",
  "الإكسسوارات الخارجية"
];
// home office
const CategoryListOffice = [
  "طاولات مكتبية",
  "خزائن مكتبية",
  "كراسي مكتبية",
  "إضاة مكتبية",
  "خزائن التخزين"
];
// kids room
const CategoryListKids = [
  "كراسي الأطفال",
  "سرير نوم الأطفال",
  "مكاتب الأطفال",
  "خزائن ملابس الأطفال",
  "خزائن دورات المياه",
  "خزائن مكتبية"
];
//storage
const CategoryListStorage = [
  "خزائن الملابس",
  "خزائن الكتب",
  "خزائن غرف الطعام",
  "خزائن دورات المياه",
  "خزائن مكتبية",
  "خزائن ملابس الأطفال"
];
//floors
const CategoryListFloors = [
  "أرضيات خشبية",
  "بلاط أو سراميك",
  "أرضيات الفينيل"
];

function getInitState() {
  return {
    newImages: [], //image files
    imagesFromDB: [],
    name: {
      value: "",
      valid: false,
      //indicates if it is the first time to edit the field. If so do not show validation error msgs
      firstTime: true,
      formError: ""
    },
    cat: {
      value: CategoryList[0], //we must fill out default value since user may not select
      valid: false,
      firstTime: true,
      formError: ""
    },
    dept: {
      value: DepartmentList[0],
      valid: false,
      firstTime: true,
      formError: ""
    },
    style: {
      value: Style[0],
      valid: false,
      firstTime: true,
      formError: ""
    },
    desc: {
      value: "",
      valid: false,
      firstTime: true,
      formError: ""
    },
    factory: {
      value: "",
      valid: false,
      firstTime: true,
      formError: ""
    },
    height: {
      value: "",
      valid: false,
      firstTime: true,
      formError: ""
    },
    length: {
      value: "",
      valid: false,
      firstTime: true,
      formError: ""
    },
    width: {
      value: "",
      valid: false,
      firstTime: true,
      formError: ""
    },
    // weight: {
    //   value: "",
    //   valid: false,
    //   firstTime: true,
    //   formError: ""
    // },
    price: {
      value: "",
      valid: false,
      firstTime: true,
      formError: ""
    },
    formValid: false,
    formStatusAlert: {
      alert: false,
      type: "info", //indicates that we should show an alert msg due to form invalid
      alertMsg: "", //message shown when form can not be submitted cause form is not valid
    },
    progressBars: {},
    submitStatus: {
      showSubmitModal: false,
      submitSuccessful: false,
      errorMsg: ''
    }
  };
}

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...getInitState() };
    //if we are updating a product then show its data in the form otherwise show an empty form
    if (!this.props.isNewProduct) {
      this.state.name.value = this.props.product.name;
      this.state.cat.value = this.props.product.category;
      this.state.dept.value = this.props.product.department;
      this.state.style.value = this.props.product.style;
      this.state.desc.value = this.props.product.desc;
      this.state.factory.value = this.props.product.factory;
      this.state.height.value = this.props.product.height;
      this.state.length.value = this.props.product.length;
      this.state.width.value = this.props.product.width;
      // this.state.weight.value = this.props.product.weight;
      this.state.price.value = this.props.product.price;
      this.state.name.valid = true;
      this.state.cat.valid = true;
      this.state.dept.valid = true;
      this.state.style.valid = true;
      this.state.desc.valid = true;
      this.state.factory.valid = true;
      this.state.height.valid = true;
      this.state.length.valid = true;
      this.state.width.valid = true;
      // this.state.weight.valid = true;
      this.state.price.valid = true;
      this.state.formValid = true
      this.state.imagesFromDB = [...this.props.product.images];//just URLs
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validationState = this.validationState.bind(this);
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this);
    this.parseArabic = this.parseArabic.bind(this);
    this.resetState = this.resetState.bind(this);
    this.addImage = this.addImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.packageProduct = this.packageProduct.bind(this);
  }

  /**
   * This will be called in one of two cases:
   * 1- the product we are updating been updated by the cloud functions to add thumbnail url, should be ignored
   * 2- the product we are updating has been changed somewhere else so we need to update form data
   * 3- the user clicked 'add new product' link so we need to clean up and prepare for adding a new product
   * @param {*} nextProps
   */
  componentWillReceiveProps(nextProps) {
    //case 1
    if (nextProps.isUpdated)
      return
    //case 2
    if (!nextProps.isNewProduct) {
      var newImages = this.state.newImages;//preserve new images added to product
      console.log("The this.props.product.category " + this.props.product.category)

      switch (this.props.product.category) {
        case "صالات": CategoryList = CategoryListLivingroom; break;
        case "مجالس": CategoryList = CategoryListSettingroom; break;
        case "غرف النوم": CategoryList = CategoryListBedroom; break;
        case "مطابخ وأواني": CategoryList = CategoryListKitchen; break;
        case "غرف الطعام": CategoryList = CategoryListDining; break;
        case "دورات المياه": CategoryList = CategoryListBath; break;
        case "الأثاث": CategoryList = CategoryListFurn; break;
        case "المخازن": CategoryList = CategoryListStorage; break;
        case "جلسات خارجية": CategoryList = CategoryListGarden; break;
        case "أرضيات": CategoryList = CategoryListFloors; break;
        case "غرف أطفال": CategoryList = CategoryListKids; break;
        case "مكاتب منزلية": CategoryList = CategoryListOffice; break;
        default:
          break;
      }

      this.setState({ cat: { value: CategoryList[0] } })

      this.setState(getInitState(), () => {
        var newState = {
          ...this.state,
          newImages: newImages,
          name: { ...this.state.name, value: this.props.product.name, valid: true },
          cat: { ...this.state.cat, value: this.props.product.category, valid: true },
          dept: { ...this.state.dept, value: this.props.product.department, valid: true },
          style: { ...this.state.style, value: this.props.product.style, valid: true },
          desc: { ...this.state.desc, value: this.props.product.desc, valid: true },
          factory: { ...this.state.factory, value: this.props.product.factory, valid: true },
          height: { ...this.state.height, value: this.props.product.height, valid: true },
          length: { ...this.state.length, value: this.props.product.length, valid: true },
          width: { ...this.state.width, value: this.props.product.width, valid: true },
          // weight: {...this.state.weight, value: this.props.product.weight, valid: true},
          price: { ...this.state.price, value: this.props.product.price, valid: true },
          formValid: true,
          imagesFromDB: [...nextProps.product.images],
          formStatusAlert: {
            alert: true,
            type: 'info',
            alertMsg: "نود تنبهك أنه تم تحديث بيانات المنتج من قبل موظف آخر وقد تم تعديل البيانات أمامك بناء على التحديث",
          }
        }
        this.setState(newState)
      })
    }
    //case 3
    else {
      this.resetState();
    }
  }

  /*
    This method adds an image to this.state.newImages to be added later
    to the database upon product upload/addition/update.
    This works for single image.
  */
  addImage(newImageFile, newImageDataURL) {
    //allow one image only and overwrite previous one
    //IT IS IMPORTANT that validateForm runs after this call to setState
    //is finished. see (https://reactjs.org/docs/state-and-lifecycle.html)
    console.log('before starting adding a new image')
    if (_.findIndex(this.state.newImages, ['url', newImageDataURL]) !== -1)
      return;
    console.log('start adding a new image')
    var newImage = { file: newImageFile, url: newImageDataURL }

    this.setState(
      {
        newImages: [...this.state.newImages, newImage]
      },
      () => this.validateForm()
    );
  }

  /*
  this method removes an image that:
  1- has been added during current session but not inserted into database yet (fromDB false)
  2- has been downloaded from DB (fromDB true)
  */
  deleteImage(imageDataURL, fromDB) {
    if (fromDB) {
      if (this.state.imagesFromDB.length > 1) {
        return this.props.deleteImageFromDB(imageDataURL)
          .then((imagesFromDB) => {
            this.setState({
              imagesFromDB: [...imagesFromDB],
            }, () => this.validateForm()
            )
          })
          .catch((error) => {
            throw error
          })
      } else {
        //now we catch this in imagePreviewsContainer so we need to remove this code
        return new Promise((resolve, reject) => {
          reject({ type: 'product error', message: 'لا بد أن يكون عدد الصور للمنتج واحدة على الأقل' })
        })
      }
    } else {
      var newImages = [...this.state.newImages];
      _.remove(newImages, (image) => image.url === imageDataURL);
      this.setState({
        newImages: [...newImages],
      }, () => this.validateForm()
      )
    }
  }

  packageProduct() {
    var product;
    //package form fields for either new or update
    product = {
      category: this.state.cat.value,
      department: this.state.dept.value,
      style: this.state.style.value,
      desc: this.state.desc.value,
      height: this.state.height.value,
      length: this.state.length.value,
      name: this.state.name.value,
      price: parseInt(this.state.price.value, 10),
      width: this.state.width.value,
      // weight: this.state.weight.value,
      factory: this.state.factory.value
    };
    //if new product add other non form properties
    if (this.props.isNewProduct) {
      product = {
        ...product,
        city: "الرياض",
        dateCreated: Date.now(),
        likes: 0,
        postType: "product"
      };
    }
    return product;
  }

  //handles form submission by calling parent onSubmit handler method
  handleSubmit(e) {
    e.preventDefault();
    try {
      if (this.state.formValid) {

        var product = this.packageProduct();
        //submit form by calling onSubmit
        //we will provide three callbacks to form submission handler in parent:
        // 1- callback for notifying us about success
        // 2- callback for notifying us about failure
        // 3- callback for notifying us about progress of submission
        // selectedImg add to onSubmit
        this.props.onSubmit(
          product, this.state.newImages,
          // progress bar updater callback
          (percentage, name) => {
            var progressBars = this.state.progressBars;
            progressBars[name] = {
              percentage: 0,
              name: name
            };
            this.setState({ progressBars: { ...progressBars } });
          })
          .then(() => {
            //show success popup
            let submitStatus = {
              showSubmitModal: true,
              submitSuccessful: true,
              errorMsg: ''
            }
            let newState = { ...this.state, progressBars: {}, submitStatus: submitStatus }
            this.setState(newState, () => { console.log('after successful form submission state is:'); console.log(this.state); })

          })
          .catch(error => {
            //show failure popup
            let submitStatus = {
              showSubmitModal: true,
              submitSuccessful: false,
              errorMsg: `حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي:
                ERROR: could not insert/update product or upload images. error code: ${error.code}, error message:${error.message}`
            }
            let newState = { ...this.state, progressBars: {}, submitStatus: submitStatus }

            this.setState(newState)

          })
      } else
        //if form is not valid show the alert message
        this.setState({
          formStatusAlert: {
            alert: true,
            type: "danger",
            alertMsg:
              " عذرا ! يجب تعبئة النموذج كاملا مع الصورة بحيث تكون البيانات المعطاة صحيحة حسب المطلوب",
            showSuccessfulSubmit: false
          }
        });
    } catch (err) {
      console.log('something went wrong while trying to add product: ');
      console.log(`ERROR: code: ${err.code}, message:${err.message}`);
      //in case something went wrong while trying to submit then handle the exception
      //hide waiting alert then show submission failure msg
      this.setState(
        {
          progressBars: {}
        }, () => this.setState(
          {
            submitStatus: {
              showSubmitModal: true,
              submitSuccessful: false,
              errorMsg: 'حدث خطأ غير معروف. نرجو ابلاغ الصيانة بالخطأ التالي: ' + err
            }
          }
        )
      );
    }
  }

  //converts indian digits into arabic ١ -> 1, ٢ -> 2 ...etc
  parseArabic(str) {

    var result = str
      .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d) {
        return d.charCodeAt(0) - 1632;
      });
    return result;
  }

  //Here we do all validations we would like
  //Note that setState does shallow merge of oldState with new one
  //(https://stackoverflow.com/questions/40601834/deep-merge-of-complex-state-in-react)
  //(https://reactjs.org/docs/update.html)
  handleChange(e) {
    //name of the field
    const name = e.target.name;
    //value of the field (for a text field the text inside it, for a select the selected value)
    let value = e.target.value;
    value = this.parseArabic(value)

    let firstTime = false;
    let valid = false;
    let formError = "";

    switch (name) {
      case "name":
        var pattern1 = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{3,30})$/i;
        var spacesPattern1 = /^([\s]+)$/;
        valid = pattern1.test(value) && !spacesPattern1.test(value);
        formError = valid
          ? ""
          : " يجب أن يكون طول اسم المنتج بين ثلاثة أحرف و ٣٠ حرف";
        break;
      case "desc":
        var pattern2 = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{15,200})$/i;
        var spacesPattern2 = /^([\s]+)$/;
        valid = pattern2.test(value) && !spacesPattern2.test(value);
        formError = valid
          ? ""
          : " يجب أن يكون طول وصف المنتج بين خمسة عشر حرفا  و ٢٠٠ حرف";
        break;
      case "factory":
        var pattern3 = /^([\w\s\u00C0-\u1FFF\u2C00-\uD7FF-]{2,100})$/i;
        var spacesPattern3 = /^([\s]+)$/;
        valid = pattern3.test(value) && !spacesPattern3.test(value);
        formError = valid ? "" : " يجب أن يكون طول اسم المصنع أقل من ١٠٠ حرف";
        break;
      case "price":
        let price = !isNaN(value)
          ? +value
          : -1;
        valid = price > 0;
        console.log(price)
        formError = valid ? "" : " يجب أن يكون سعر المنتج رقم أكبر من الصفر";
        break;
      case "length":
        let length = !isNaN(value)
          ? +value
          : -1;
        valid = length > 0 && length < 10000;
        formError = valid
          ? ""
          : "  يجب أن يكون طول المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      case "width":
        let width = !isNaN(value)
          ? +value
          : -1;
        valid = width > 0 && width < 10000;
        formError = valid
          ? ""
          : " يجب أن يكون عرض المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      // case "weight":
      // let weight = !isNaN(value)
      //   ? +value
      //   : -1;
      // valid = weight > 0 ;
      // formError = valid
      //   ? ""
      //   : " يجب أن يكون وزن المنتج رقم أكبر من الصفر";
      // break;
      case "height":
        let height = !isNaN(value)
          ? +value
          : -1;
        valid = height > 0 && height < 10000;
        formError = valid
          ? ""
          : " يجب أن يكون ارتفاع المنتج رقم أكبر من الصفر وأصغر من ١٠٠٠٠ سم";
        break;
      case "dept":
        console.log("The index " + value)
        switch (value) {
          case "صالات": CategoryList = CategoryListLivingroom; break;
          case "مجالس": CategoryList = CategoryListSettingroom; break;
          case "غرف النوم": CategoryList = CategoryListBedroom; break;
          case "مطابخ وأواني": CategoryList = CategoryListKitchen; break;
          case "غرف الطعام": CategoryList = CategoryListDining; break;
          case "دورات المياه": CategoryList = CategoryListBath; break;
          case "الأثاث": CategoryList = CategoryListFurn; break;
          case "المخازن": CategoryList = CategoryListStorage; break;
          case "جلسات خارجية": CategoryList = CategoryListGarden; break;
          case "أرضيات": CategoryList = CategoryListFloors; break;
          case "غرف أطفال": CategoryList = CategoryListKids; break;
          case "مكاتب منزلية": CategoryList = CategoryListOffice; break;
          default:
            break;
        }
        break;
      default:
        break;
    }

    let newState = {
      [name]: { ...this.state[name], valid, formError, value, firstTime }
    };

    //setState will shallow merge the new state with the current
    //IT IS IMPORTANT that validateForm runs after this call to setState
    //is finished. see (https://reactjs.org/docs/state-and-lifecycle.html)
    this.setState(newState, () => this.validateForm());
  }

  //after each field validatiion, here we revalidate the whole form
  validateForm() {
    this.setState(
      {
        formValid:
          this.state.name.valid &&
          this.state.desc.valid &&
          this.state.factory.valid &&
          this.state.height.valid &&
          this.state.length.valid &&
          this.state.width.valid &&
          // this.state.weight.valid &&
          this.state.price.valid &&
          (this.state.newImages.length > 0 || this.state.imagesFromDB.length > 0)
      },
      () =>
        //if alert box is visible then change it to invisible
        this.setState(prevState => {
          return {
            formStatusAlert: {
              alert: false,
              type: prevState.formStatusAlert.type,
              alertMsg: "",
              showSuccessfulSubmit: false
            }
          };
        })
    );
  }

  //outputs validatin state of a field (valid, not valid, neutral since it is not touched yet)
  validationState(firstTimeFlag, validFlag) {
    if (firstTimeFlag) return null;
    else if (validFlag) return "success";
    else return "error";
  }

  //handles the dismissal of the alert box that appears when trying to submit invalid form
  //or when form submission fails
  handleAlertDismiss() {
    this.setState(prevState => {
      return {
        formStatusAlert: {
          alert: false,
          type: prevState.formStatusAlert.type,
          alertMsg: "",
          showSuccessfulSubmit: false
        }
      };
    });
  }

  //reset state is used when someone adds a product and asks to add another one
  //so we reset the state for the new product
  resetState() {
    this.setState(getInitState);
  }

  render() {
    return (
      <form>
        <div>
          {this.props.isNewProduct
            ? <h2 style={{ color: 'rgb(26,156,142)' }}>إضافة المنتج </h2>
            : <h2 style={{ color: 'rgb(26,156,142)' }}> تحديث المنتج </h2>
          }

        </div>
        <ImagePreviewsContainer
          imagesFromDB={this.state.imagesFromDB}
          newImages={this.state.newImages}
          addImage={this.addImage}
          onImageDelete={this.deleteImage}
        />

        <FieldGroup
          id="formControlsProductName"
          type="text"
          label="الاسم"
          placeholder="أدخل اسم المنتج (مثلا: طقم كنب، بانيو حجري ...الخ)"
          onChange={this.handleChange}
          name="name"
          value={this.state.name.value}
          help={this.state.name.formError}
          validationState={this.validationState(
            this.state.name.firstTime,
            this.state.name.valid
          )}
        />

        <FieldGroup
          id="formControlsProductPrice"
          type="text"
          label="السعر"
          placeholder="أدخل السعر"
          onChange={this.handleChange}
          name="price"
          value={this.state.price.value}
          help={this.state.price.formError}
          validationState={this.validationState(
            this.state.price.firstTime,
            this.state.price.valid
          )}
        />
        <FieldGroup
          id="formControlsProductLength"
          type="text"
          label="الطول"
          placeholder="أدخل الطول بال سم"
          onChange={this.handleChange}
          name="length"
          value={this.state.length.value}
          help={this.state.length.formError}
          validationState={this.validationState(
            this.state.length.firstTime,
            this.state.length.valid
          )}
        />
        <FieldGroup
          id="formControlsProductWidth"
          type="text"
          label="العرض"
          placeholder="أدخل العرض بال سم"
          onChange={this.handleChange}
          name="width"
          value={this.state.width.value}
          help={this.state.width.formError}
          validationState={this.validationState(
            this.state.width.firstTime,
            this.state.width.valid
          )}
        />
        <FieldGroup
          id="formControlsProductHeight"
          type="text"
          label="الارتفاع"
          placeholder="أدخل الارتفاع بال سم"
          onChange={this.handleChange}
          name="height"
          value={this.state.height.value}
          help={this.state.height.formError}
          validationState={this.validationState(
            this.state.height.firstTime,
            this.state.height.valid
          )}
        />
        {/* <FieldGroup
          id="formControlsProductWeight"
          type="text"
          label="الوزن"
          placeholder="أدخل الوزن بال كم"
          onChange={this.handleChange}
          name="weight"
          value={this.state.weight.value}
          help={this.state.weight.formError}
          validationState={this.validationState(
            this.state.weight.firstTime,
            this.state.weight.valid
          )}
        /> */}
        <FieldGroup
          id="formControlsProductFactory"
          type="text"
          label="اسم المصنع"
          placeholder="أدخل اسم المصنع"
          onChange={this.handleChange}
          name="factory"
          value={this.state.factory.value}
          help={this.state.factory.formError}
          validationState={this.validationState(
            this.state.factory.firstTime,
            this.state.factory.valid
          )}
        />

        <FieldGroup
          id="formControlsProductDesc"
          componentClass="textarea"
          label="وصف المنتج"
          placeholder="ادخل وصف المنتج"
          onChange={this.handleChange}
          name="desc"
          value={this.state.desc.value}
          help={this.state.desc.formError}
          validationState={this.validationState(
            this.state.desc.firstTime,
            this.state.desc.valid
          )}
        />

        <SelectGroup
          controlId="formControlsProductDeptSelect"
          label="القسم"
          name="dept"
          placeholder={"اختر القسم الذي تنتمي له قطعة الأثاث "}
          onChange={this.handleChange}
          options={DepartmentList}
          selectedOption={this.state.dept.value}
        />


        <SelectGroup
          controlId="formControlsProductCatSelect"
          label="الصنف"
          name="cat"
          placeholder="أدخل الصنف (مثلا: طقم كنب، أدوات صحية ...الخ)"
          onChange={this.handleChange}
          options={CategoryList}
          selectedOption={this.state.cat.value}
        />

        <SelectGroup
          controlId="formControlsProductStyleSelect"
          label="الطراز"
          name="style"
          placeholder="أدخل الطراز (مثلا: كلاسيكي، معاصر ...الخ)"
          onChange={this.handleChange}
          options={Style}
          selectedOption={this.state.style.value}
        />

        <button type="submit" onClick={this.handleSubmit}  >
          {this.props.isNewProduct
            ? <span> أضف المنتج </span>
            : <span> تحديث المنتج </span>
          }
        </button>
        <LinkContainer to="/myprofile" activeClassName="active">
          <button   >
            إلغاء
          </button>
        </LinkContainer>
        <Collapse in={this.state.formStatusAlert.alert}>
          <Alert
            bsStyle={this.state.formStatusAlert.type}
            onDismiss={this.handleAlertDismiss}
          >
            {this.state.formStatusAlert.alertMsg}
          </Alert>
        </Collapse>

        {/* This modal is shown after product addition/form submission is finshed.
          Its content depends if the form submission was successful or failed.
          if successful it will ask if user wants to add another new product or go to main page.
          If failed it will show error message and ask user to go to home pgae  */}
        <Modal
          show={this.state.submitStatus.showSubmitModal}
          style={{ top: 300 }}
        >
          <Modal.Header >
            {this.state.submitStatus.submitSuccessful
              ? this.props.isNewProduct
                ? <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{ color: 'green', width: '30px', height: '30px' }} />  تمت اضافة المنتج بنجاح</Modal.Title>
                : <Modal.Title id="contained-modal-title"><FaCheckCircleO style={{ color: 'green', width: '30px', height: '30px' }} />  تمت تحديث المنتج بنجاح</Modal.Title>
              : this.props.isNewProduct
                ? <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{ color: 'red', width: '30px', height: '30px' }} />  يوجد خطأ في اضافة المنتج</Modal.Title>
                : <Modal.Title id="contained-modal-title"><FaTimesCircleO style={{ color: 'red', width: '30px', height: '30px' }} />  يوجد خطأ في تحديث المنتج</Modal.Title>
            }
          </Modal.Header>
          {
            this.state.submitStatus.submitSuccessful
              ?
              <Modal.Body>
                &nbsp;&nbsp;
                {this.props.isNewProduct
                  ? <Link to="/newproduct">
                    <Button onClick={this.resetState}>اضافة منتج جديد</Button>
                  </Link>
                  : <Link to="/"></Link>
                }
                &nbsp;&nbsp;&nbsp;
                <Link to="/">
                  <Button>العودة للصفحة الرئيسية</Button>
                </Link>
              </Modal.Body>
              :
              <Modal.Body>
                <Alert
                  bsStyle='danger'
                >
                  {this.state.submitStatus.errorMsg}
                </Alert>
                <Link to="/">
                  <Button>العودة للصفحة الرئيسية</Button>
                </Link>
              </Modal.Body>
          }
        </Modal>
        {this.props.isNewProduct
          ? <MyProgressBar title='جاري اضافة المنتج' progressBars={this.state.progressBars} />
          : <MyProgressBar title='جاري تحديث المنتج' progressBars={this.state.progressBars} />
        }
      </form>
    );
  }
}

export default ProductForm;

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import './Dashboard.css'
import supabase from '../../supabaseClient';
import formatDate from '../formDate';
import Projectcard from '../Project/Projectcard';
import { useNavigate } from 'react-router-dom';
const Dashboard=()=> {
    const navigate = useNavigate();
const [passwordState,setPasswordstate]=useState(false);

    useEffect(() => {
        const checkPassword = async () => {
          const password = prompt('Please enter your password:');
          
          if (password) {
            const { data, error } = await supabase
              .from('password')
              .select('password')
              .eq('password', password)
              .single();
    
            if (error || !data) {
              alert('Invalid password!');
              navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية أو صفحة أخرى
            } else {
              alert('Welcome to the dashboard!');
              setPasswordstate(true)
              // يمكنك إضافة أي كود آخر لمتابعة العمليات بعد التحقق الناجح
            }
          }
        };
    
        checkPassword();
      }, [navigate]);
    








const [selectedFile, setSelectedFile] = useState(null);
const [uploading, setUploading] = useState(false);
const [fetcherror,setFetcherror]=useState(null);
const [category,setCategory]=useState([]);
const [categoryName, setCategoryName] = useState('');
const [technical,setTechnical]=useState([]);
const [technicalName,setTechnicalName]=useState('');
const [loading, setLoading] = useState(false); // حالة للتحقق من التحميل
const [error, setError] = useState(null); // حالة لتخزين الأخطاء
const [success, setCvSuccess] = useState(false);
const [cvloading, setCvLoading] = useState(false); // حالة للتحقق من التحميل
const [cverror, setCVError] = useState(null); // حالة لتخزين الأخطاء
const [cvsuccess, setSuccess] = useState(false); // حالة لتخزين النجاح // حالة لتخزين النجاح
const [message,setMessage]=useState([]);
const [project,setproject]=useState([]);
const [name_ar,setName_ar]=useState('');
const [name_en,setName_en]=useState('');
const [desc_ar,setDesc_ar]=useState('');
const [desc_en,setDesc_en]=useState('');
const [demo,setDemo]=useState('');
const [source,setSource]=useState('');
const [selectCategory,setSelectCategory]=useState('');
const [image, setImage] = useState(null);
const [selectTools,setSelectTools]=useState('');
const [selectProject,setSelectProject]=useState('');

useEffect(()=>{
  getCatigory();
  getTools();
  getMessage();
  getProject();
},[]);
 
const handleChange=(event)=>{
    const e=event.target.value;
    setSelectCategory(e);
}
const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        setSelectedFile(file);
    }
};
const handleImageFileChange = (e) => {
    setImage(e.target.files[0]);
};
const handleToolsChange=(event)=>{
    const e=event.target.value;
    setSelectTools(e);
};
const handleProjectChange=(event)=>{
    const e=event.target.value;
    setSelectProject(e);
}

const handelCV = async (e) => {
    e.preventDefault();
    setCvLoading(true); // بدء التحميل
    setCVError(null); // إعادة تعيين الأخطاء السابقة

    if (!selectedFile) {
        toast.caller('يرجى اختيار ملف!');
        return;
    }

    try {
        setUploading(true);
        // رفع الملف إلى Supabase
        const { data: fileData, error: uploadError } = await supabase.storage
            .from('profile') // تأكد من أن لديك حزمة تخزين تسمى "cv"
            .upload(`cv/${selectedFile.name}`, selectedFile); // تأكد من استخدام اسم الملف بشكل صحيح

        if (uploadError) {
            throw uploadError; // رمي الخطأ في حالة حدوثه
        }

        // حفظ بيانات رفع الملف في جدول Cv
        const { data, error } = await supabase
            .from('cv')
            .insert([
                { cv: fileData.path } // تخزين المفتاح أو المسار في جدول Cv
            ]);

        if (error) {
            throw error; // رمي الخطأ إذا حدث
        }
        
        console.log('تم رفع السيرة الذاتية بنجاح:', data);
        toast.success(`تم رفع السيرة الذاتية بنجاح:`)
        setCvSuccess(true);
        // يمكنك هنا إعادة تعيين البيانات أو عرض رسالة نجاح للمستخدم
        
    } catch (error) {
      setCVError(error.message)
        toast.error(`${error.message}خطأ في رفع السيرة الذاتية:`);
        console.error('خطأ في رفع السيرة الذاتية:', error.message);
        // إدارة الأخطاء - يمكنك تحديث الحالة لإظهار رسالة خطأ للمستخدم
    } finally {
        setUploading(false);
        setCvLoading(false);
    }
};


const handelShowCv = async () => {
    try {
        // استرجاع آخر سجل من جدول Cv
        const { data: lastCv, error: fetchError } = await supabase
            .from('cv')
            .select('cv') // حقل المسار فقط
            .order('id', { ascending: false }) // ترتيب حسب ID تنازلي للحصول على الأحدث
            .limit(1) // الحصول على سجل واحد فقط
            .single(); // استرجاع سجل واحد

        if (fetchError) {
            throw fetchError;
        }

        // تحقق مما إذا كانت هناك بيانات
        if (!lastCv || !lastCv.cv) {
            console.error('لم يتم العثور على الملف.');
            toast.error('لم يتم العثور على الملف.')
            return;
        }

        // تنزيل الملف من مجموعة التخزين
        const { data: fileData, error: downloadError } = await supabase.storage
            .from('profile') // استخدام اسم التخزين
            .download(lastCv.cv); // استخدم المسار من قاعدة البيانات
        if (downloadError) {
            throw downloadError;
        }
        // إنشاء رابط لتحميل الملف
        const url = URL.createObjectURL(fileData);
        const a = document.createElement('a');
        a.href = url;
        a.download = lastCv.cv.split('/').pop(); // استخدام اسم الملف من المسار
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url); // تحرير الذاكرة
        toast.success("تم التنزيل بنجاح")

    } catch (error) {
        console.error('خطأ أثناء تنزيل السيرة الذاتية:', error.message);
        toast.error(`${error.message}`)
        // يمكنك أيضًا عرض رسالة خطأ للمستخدم هنا
    }
};
const getCatigory = async () => {
 
    const {data,error}=await supabase
    .from("category")
    .select("*")
    if(error){
      setFetcherror("Could not Fetch Data")
      setCategory(null)
      console.log(error)
    }

    
    if(data){
      setCategory(data)
      setFetcherror(null)

    }
    if(data===null){
      console.log("DATA is Null")
    }
};

const handelAddCategory = async (e) => {
    e.preventDefault(); // منع تحديث الصفحة عند تقديم النموذج

    setLoading(true); // بدء التحميل
    setError(null); // إعادة تعيين الأخطاء السابقة

    try {
        // محاولة إضافة فئة جديدة إلى جدول category
        const { data, error } = await supabase
            .from('category')
            .insert([{ name: categoryName }]);

        if (error) throw error; // رمي الخطأ إذا حدث

        console.log('تم إضافة الفئة بنجاح:', data);
        getCatigory();
        setSuccess(true); // ضبط حالة النجاح
        setCategoryName(''); // إعادة تعيين المدخل
        
    } catch (error) {
        setError(error.message); // ضبط حالة الخطأ
        console.error('خطأ في إضافة الفئة:', error.message);
    } finally {
        setLoading(false); // إعادة تعيين حالة التحميل
    }
};

const getTools=async () => {
    const {data,error}=await supabase
    .from("tools")
    .select("*")
    if(error){
      setFetcherror("Could not Fetch Data")
      setTechnical(null)
      console.log(error)
    }

    
    if(data){
      setTechnical(data)
      setFetcherror(null)

    }
    if(data===null){
      console.log("DATA is Null")
    }
};

const handelAddTechnical= async (e) => {
e.preventDefault(); // منع تحديث الصفحة عند تقديم النموذج
try {
    // محاولة إضافة فئة جديدة إلى جدول category
    const { data, error } = await supabase
        .from('tools')
        .insert([{ name: technicalName }]);

    if (error) throw error; // رمي الخطأ إذا حدث

    console.log('تم إضافة تقنية بنجاح:', data);
    getTools();
    toast.success( `تم إضافة تقنية بنجاح:`)
    setTechnicalName(''); // إعادة تعيين المدخل
    
} catch (error) {
    console.error('خطأ في تقنية الفئة:', error.message);
    toast.error(`${error.message}`)
} 
};

const getMessage=async()=>{
    const {data,error}=await supabase
    .from("message")
    .select("*")
    .order('created_at', { ascending: false });
    if(error){
      setFetcherror("Could not Fetch Data")
      setMessage(null)
      console.log(error)
    }

    
    if(data){
        console.log(data)
      setMessage(data)
      setFetcherror(null)

    }
    if(data===null){
      console.log("DATA is Null")
    }
};
const getProject= async (activeCategory) => {
 
      const {data,error} = await supabase
      .from('project')
      .select(`*
      )`)  
      
      if(error){
        setFetcherror("Could not Fetch Data")
        setproject(null)
        console.log(error)
      }
  
      
      if(data){
        setproject(data)
        console.log(data)
  
        setFetcherror(null)
  
      }
      if(data===null){
        console.log("DATA is Null")
      }
   
   
  };

const handelAddProject=async(e)=>{
e.preventDefault(); // منع تحديث الصفحة عند تقديم النموذج

if (!image) {
    alert('Please upload an image.');
    return;
}

// تحميل الصورة إلى Supabase Storage
const { data: imageData, error: uploadError } = await supabase
    .storage
    .from('profile')
    .upload(`img/${image.name}`, image);

if (uploadError) {
    console.error('Error uploading image:', uploadError);
    return;
}

let imgPath = imageData.path;
const {data:url}=await supabase.storage
.from('profile')
.getPublicUrl(imgPath);
imgPath=url.publicUrl;
console.log(imgPath);
// إدراج البيانات في قاعدة البيانات
const { data, error } = await supabase
    .from('project')
    .insert({
    name_ar,
    name_en,
    desc_ar,
    desc_en,
    demo,
    source,
    category: selectCategory,
    img: imgPath
    });

if (error) {
    console.error('Error inserting project:', error);
    toast.error(`'Error inserting project:'${error} `)
} else {
    console.log('Project added successfully:', data);
    toast.success('Project added successfully:');
    getProject();
    setName_ar('');
    setName_en('');
    setDesc_ar('');
    setDesc_en('');
    setDemo('');
    setSource('')
    setSelectCategory('');
    setImage(null);
    getProject();
}
};
const handelProjectToolsRel=async(e)=>{
    e.preventDefault();

    const { error } = await supabase
      .from('project_tools_rel')
      .insert([{ project: selectProject, tools: selectTools }]);

    if (error) {
      console.log('Error inserting data:', error);
      toast.error(`'Error inserting data:'${error}`)
    } else {
      console.log('Data inserted successfully!');
      toast.success('Data inserted successfully!')
      // يمكنك مسح الاختيارات بعد الإدراج إذا أردت
      setSelectProject('');
      setSelectTools('');
      getProject();
    }
}
  return (
    
    <div className='dashboard '>
       {passwordState? <></>:<div className='overlay'></div>}
         <div className='header'>
             <h1>My Dashboard</h1>
           </div>
        <div className='container'>
          
           <div className='box'>
           
            <div className='cv-item'>
            <h2>My Cv</h2>
              <button className='primary-btn' onClick={handelShowCv}>Show My Cv</button>
            </div>
            <form className='cv-add' onSubmit={handelCV}>
            <label htmlFor="pdf-upload">تحميل السيرة الذاتية (PDF فقط):</label>
            <input 
                type="file" 
                id="pdf-upload" 
                accept=".pdf" 
                onChange={handleFileChange}
                required 
            />
            <button className='primary-btn' type="submit">
              
              {cvloading ? 'جاري إضافة...' : 'إرسال'} {/* تغيير نص الزر أثناء التحميل */}
              </button>
            {cverror && <p style={{ color: 'red' }}>{error}</p>} {/* عرض الأخطاء إذا كانت موجودة */}
            {cvsuccess && <p style={{ color: 'green' }}>تم إرسال الرسالة بنجاح!</p>} {/* عرض رسالة النجاح */}
        </form>
           </div>
           <div className='box'>
            <h2>Categories</h2>
            <div className='category-item'>
                {category.map((val,ind)=>{
                    return(
                      <span key={ind}>{val.name}</span>
                    )
                })}
            </div>
            <div className='category-item-add'>
              <h3>Add New Category</h3>
              <form onSubmit={handelAddCategory}>
            <input 
                type='text' 
                placeholder='Type category name here' 
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)} // تحديث حالة اسم القسم عند الكتابة
                required // يمكنك إضافة required لضمان ملء الحقل
            />
            <button className='primary-btn' type='submit' disabled={loading}>
                {loading ? 'جاري إضافة...' : 'Ok'} {/* تغيير نص الزر أثناء التحميل */}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* عرض الأخطاء إذا كانت موجودة */}
            {success && <p style={{ color: 'green' }}>تم إضافة الفئة بنجاح!</p>} {/* عرض رسالة النجاح */}
        </form>
            </div>
           </div>
           <div className='box'>
            <h2>Technicals</h2>
              <div className='technical-item'>
              {technical.map((val,ind)=>{
                  return(
                    <span key={ind}>{val.name}</span>
                  )
                })}
              </div>
              <div className='technical-item-add'>
              <h3>Add New Technical</h3>
              <form onSubmit={handelAddTechnical}>
                  <input 
                      type='text' 
                      placeholder='Type category name here' 
                      value={technicalName}
                      onChange={(e) => setTechnicalName(e.target.value)} // تحديث حالة اسم القسم عند الكتابة
                      required // يمكنك إضافة required لضمان ملء الحقل
                  />
                  <button className='primary-btn' type='submit'>Ok</button>
              </form>
              </div>
           </div>
           <div className='box'>
            <h2>Messages :</h2>
              { message.map((val,ind)=>{
               return(
                <div key={ind} className='message-item'>
                    <span className='message-name'>Name:{val.name}</span>
                    <p className='message-email'>Email:{val.email}</p>
                    <p className='message-date'>Date: {formatDate(val.created_at)}</p>
                    <p className='message'>{val.message}</p>
                </div>
               )
              })}
              
           </div>
           <div className='project'>
           <div className='box content'>
            <h2>Projects :</h2>
              { project.map((val,ind)=>{
               return(
                <Projectcard id={val.id}
                name_ar={val.name_ar}
                name_en={val.name_en}
                desc_ar={val.desc_ar}
                desc_en={val.desc_en}
                demo={val.demo}
                source={val.source}
                date={val.date}
                img={val.img}
                category={val.category}
                key={ind}
                />
               )
              })}
              <div className='project-add'>
                <h2>ADD NEW Project</h2>
                <form onSubmit={handelAddProject}>
                <label>{ 'اسم المشروع:'}</label>
                  <input 
                      type='text' 
                      placeholder='أكتب اسم المشروع هنا' 
                      value={name_ar}
                      onChange={(e) => setName_ar(e.target.value)} // تحديث حالة اسم القسم عند الكتابة
                      required // يمكنك إضافة required لضمان ملء الحقل
                  /> 
                    <label>{ 'NAME OF PROJECT:'}</label>
                   <input 
                      type='text' 
                      placeholder='Type Project name here' 
                      value={name_en}
                      onChange={(e) => setName_en(e.target.value)} // تحديث حالة اسم القسم عند الكتابة
                      required // يمكنك إضافة required لضمان ملء الحقل
                  />
                   <label>{ 'الوصف:'}</label>
                <textarea
                    placeholder={ 'أكتب الوصف هنا....'}
                    value={desc_ar}
                    onChange={(e) => setDesc_ar(e.target.value)}
                    required
                />
                 <label>{ 'DESCRIPTION:'}</label>
                 <textarea
                    placeholder={ 'أكتب الوصف هنا....'}
                    value={desc_en}
                    onChange={(e) => setDesc_en(e.target.value)}
                    required
                />
                 <label>{ 'DEMO LINK:'}</label>
                   <input 
                      type='text' 
                      placeholder='Type Project name here' 
                      value={demo}
                      onChange={(e) => setDemo(e.target.value)} // تحديث حالة اسم القسم عند الكتابة
                      required // يمكنك إضافة required لضمان ملء الحقل
                  />
                  <label>{ 'Source LINK:'}</label>
                   <input 
                      type='text' 
                      placeholder='Type Project name here' 
                      value={source}
                      onChange={(e) => setSource(e.target.value)} // تحديث حالة اسم القسم عند الكتابة
                      required // يمكنك إضافة required لضمان ملء الحقل
                  />
                   <label htmlFor="img-upload">تحميل صورة المشروع (jpg,png فقط):</label>
                   <input 
                        type="file" 
                        id="image-upload" 
                        accept=".png, .jpg, .jpeg" 
                        onChange={handleImageFileChange}
                        required 
                    />
                        <label>Choose Category</label>
                      <select name="language" id="language" onChange={handleChange}>
                      <option value=""></option>
                        {category.map((val,ind)=>{
                            return(
                                <option value={val.id}>{val.name}</option>
                            )
                        })}
                       
                    </select>
                  <button className='primary-btn' type='submit'>Ok</button>
              </form>
              </div>
           </div>
           </div>
           <div className='box'>
            <div className='project-tools-rel'>
            <h2>PROJECT_TOOLS REL :</h2>
            
            <form onSubmit={handelProjectToolsRel}>
                    <label>Choose Project:</label>
                      <select name="language" id="language" onChange={handleProjectChange}>
                      <option selected value=""></option>
                        {project.map((val,ind)=>{
                            return(
                                <option value={val.id}>{ val.name_ar}</option>
                            )
                        })}
                       
                    </select>
                    <label>Choose Tools:</label>
        
                      <select name="language" id="language" onChange={handleToolsChange}>
                      <option selected value=""></option>
                        {technical.map((val,ind)=>{
                            return(
                                <option value={val.id}>{ val.name}</option>
                            )
                        })}
                       
                    </select>
                    <button className='primary-btn' type='submit'>Ok</button>

                </form>
            </div>
           </div>
        </div>

    </div>
  )
}

export default Dashboard
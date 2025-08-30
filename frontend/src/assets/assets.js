import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import raicare_logo from './raicare_logo.png'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    raicare_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Ghulam Asghar',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ghulam Asghar specializes in comprehensive medical care for individuals of all ages. He focuses on preventive healthcare, diagnosis, and managing chronic conditions such as diabetes and hypertension.',
        fees: 5000,
        address: {
            line1: '17th Cross, Johar Town',
            line2: 'Near Emporium Mall, Lahore'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Rabia Bashir Rai',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rabia Bashir Rai is a specialist in women’s reproductive health, offering expert care in pregnancy, childbirth, and fertility issues. She is also skilled in treating hormonal imbalances and other gynecological concerns.',
        fees: 6000,
        address: {
            line1: '27th Street, DHA Phase 5',
            line2: 'Near Lalik Chowk, Lahore'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Rai Waqas',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Rai Waqas provides advanced care for skin conditions, including acne, eczema, psoriasis, and skin infections. He also offers cosmetic treatments like skin rejuvenation and hair loss therapy.',
        fees: 3000,
        address: {
            line1: '5th Avenue, Gulberg 3',
            line2: 'Near Liberty Market, Lahore'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Rai Usman',
        image: doc4,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Rai Usman is an expert in digestive system disorders. He treats patients with conditions like ulcers, irritable bowel syndrome (IBS), and liver disease. His focus is on providing relief through both medical and dietary interventions.',
        fees: 4000,
        address: {
            line1: '47th Cross, Model Town',
            line2: 'Near Link Road, Lahore'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Tayyba Shoiab',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Tayyba Shoiab specializes in neurological conditions such as epilepsy, migraines, and stroke management. She is dedicated to helping patients with chronic neurological disorders improve their quality of life.',
        fees: 5000,
        address: {
            line1: '57th Cross, Wapda Town',
            line2: 'Near Wapda Society Market, Lahore'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Ammar Madani',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ammar Madani is an experienced neurologist focusing on conditions affecting the brain and nervous system, including multiple sclerosis, Parkinson’s disease, and neuropathy.',
        fees: 5000,
        address: {
            line1: '23rd Cross, Garden Town',
            line2: 'Near Barkat Market, Lahore'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Rai Ali Waris',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rai Ali Waris offers primary care services, including routine check-ups, managing chronic illnesses, and providing preventive healthcare to promote overall wellness.',
        fees: 5000,
        address: {
            line1: '17th Cross, Allama Iqbal Town',
            line2: 'Near Moon Market, Lahore'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Rai AbuBakar',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rai AbuBakar is a trusted gynecologist offering expert care in women’s reproductive health. He specializes in pregnancy management, hormonal disorders, and gynecological surgeries.',
        fees: 6000,
        address: {
            line1: '27th Street, Cavalry Ground',
            line2: 'Near Fortress Stadium, Lahore'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Nadia Abbas',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Nadia Abbas specializes in treating skin, hair, and nail conditions. She offers advanced treatments for acne, pigmentation, and hair loss while providing cosmetic skin procedures.',
        fees: 3000,
        address: {
            line1: '8th Street, Faisal Town',
            line2: 'Near Akbar Chowk, Lahore'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Zulfkar',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Zulfkar is a compassionate pediatrician providing medical care for children, from infancy through adolescence. He specializes in childhood illnesses, vaccinations, and growth monitoring.',
        fees: 4000,
        address: {
            line1: '14th Avenue, Johar Town',
            line2: 'Near Shaukat Khanum Hospital, Lahore'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Ajwa Shoiab',
        image: doc11,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Ajwa Shoiab is dedicated to the well-being of children, focusing on preventive care, early disease detection, and the management of chronic conditions in young patients.',
        fees: 5000,
        address: {
            line1: '57th Cross, Bahria Town',
            line2: 'Near Grand Mosque, Lahore'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Rai Awais',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rai Awais focuses on diagnosing and treating neurological disorders such as epilepsy, migraines, and neuromuscular diseases. His aim is to provide cutting-edge care with a patient-centered approach.',
        fees: 5000,
        address: {
            line1: '25th Street, Valencia Town',
            line2: 'Near Valencia Main Market, Lahore'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Arshia Imtiaz',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Arshia Imtiaz is committed to offering holistic primary care, managing acute and chronic conditions, and providing preventive health services to patients across all age groups.',
        fees: 5000,
        address: {
            line1: '17th Cross, Canal View',
            line2: 'Near EME Society, Lahore'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Rai Zain',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rai Zain is a specialist in women’s reproductive health, including managing pregnancies, menstrual disorders, and fertility treatments. He is also experienced in minimally invasive gynecological surgeries.',
        fees: 6000,
        address: {
            line1: '27th Street, Model Town',
            line2: 'Near Bank Square Market, Lahore'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Sobia Abbas',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Sobia Abbas offers specialized care for skin conditions, including eczema, acne, and skin allergies. She is skilled in cosmetic dermatology, providing treatments for aging skin and scars.',
        fees: 3000,
        address: {
            line1: '9th Avenue, Garden Town',
            line2: 'Near Kalma Chowk, Lahore'
        }
    }
    
]
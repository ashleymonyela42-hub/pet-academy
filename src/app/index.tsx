import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';

const COLORS = {
  forest: '#178A52',
  lightBlue: '#D9F5FA',
  lightGreen: '#C9F59B',
  gold: '#FFD600',
  darkGreen: '#075C38',
  white: '#FFFFFF',
  black: '#222222',
  grey: '#777777',
};

const courses = [
  {
    id: '1',
    name: 'Canine Obedience Training',
    price: 850,
    duration: '6 months',
    image:
      'https://images.unsplash.com/photo-1558788353-f76d92427f16?w=800',
      heroImage:{
      width: 100,
      height: 150
     }, 
    description:
      'Learn how to train dogs effectively using positive and practical training techniques.',
     
  },
  {
    id: '2',
    name: 'Pet Grooming',
    price: 850,
    duration: '6 months',
    image:
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800',
    description:
      'Learn professional grooming techniques and how to care for different types of pets.',
  },
  {
    id: '3',
    name: 'Animal Behaviour',
    price: 850,
    duration: '6 months',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    description:
      'Understand animal behaviour, communication and common behavioural problems.',
  },
  {
    id: '4',
    name: 'Pet Business Management',
    price: 850,
    duration: '6 months',
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
    description:
      'Learn basic business management skills needed to operate a successful pet business.',
  },
  {
    id: '5',
    name: 'Puppy Care',
    price: 750,
    duration: '6 weeks',
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
    description:
      'Learn how to take care of puppies and provide them with a safe and healthy environment.',
  },
  {
    id: '6',
    name: 'Pet First Aid',
    price: 750,
    duration: '6 weeks',
    image:
      'https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=800',
    description:
      'Learn important first-aid skills for dealing with common pet emergencies.',
  },
  {
    id: '7',
    name: 'Basic Dog Walking',
    price: 750,
    duration: '6 weeks',
    image:
      'https://images.unsplash.com/photo-1558929996-da64ba858215?w=800',
    description:
      'Learn safe dog walking techniques and how to handle different types of dogs.',
  },
];

type Screen =
  | 'home'
  | 'about'
  | 'overview'
  | 'course'
  | 'fees'
  | 'contact';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const openCourse = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setScreen('course');
  };

  const toggleCourse = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses(selectedCourses.filter((item) => item !== id));
    } else {
      setSelectedCourses([...selectedCourses, id]);
    }
  };

  const calculateTotal = () => {
    const selected = courses.filter((course) =>
      selectedCourses.includes(course.id)
    );

    const subtotal = selected.reduce(
      (total, course) => total + course.price,
      0
    );

    let discount = 0;

    if (selected.length === 2) {
      discount = 5;
    } else if (selected.length === 3) {
      discount = 10;
    } else if (selected.length > 3) {
      discount = 15;
    }

    const discountAmount = subtotal * (discount / 100);
    const total = subtotal - discountAmount;

    return {
      subtotal,
      discount,
      discountAmount,
      total,
    };
  };

  const result = calculateTotal();

  const Header = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.logoText}>🐾 Pawsitive</Text>
        <Text style={styles.logoSub}>PET ACADEMY</Text>
      </View>
    </View>
  );

  const Navigation = () => (
    <View style={styles.navigation}>
      <TouchableOpacity onPress={() => setScreen('home')}>
        <Text style={styles.navText}>HOME</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('about')}>
        <Text style={styles.navText}>ABOUT</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('overview')}>
        <Text style={styles.navText}>COURSES</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('fees')}>
        <Text style={styles.navText}>FEES</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('contact')}>
        <Text style={styles.navText}>CONTACT</Text>
      </TouchableOpacity>
    </View>
  );

  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => setScreen('home')}>
        <Text style={styles.bottomIcon}>⌂</Text>
        <Text style={styles.bottomText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('overview')}>
        <Text style={styles.bottomIcon}>🐾</Text>
        <Text style={styles.bottomText}>Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('fees')}>
        <Text style={styles.bottomIcon}>💰</Text>
        <Text style={styles.bottomText}>Fees</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('contact')}>
        <Text style={styles.bottomIcon}>☎</Text>
        <Text style={styles.bottomText}>Contact</Text>
      </TouchableOpacity>
    </View>
  );

  const HomeScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header />
      <Navigation />

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000',
        }}
        style={styles.heroImage}
      />

      <View style={styles.hero}>
        <Text style={styles.heroTitle}>WELCOME TO PAWSITIVE PET ACADEMY</Text>

        <Text style={styles.heroText}>
          Professional pet care education and practical animal training for
          pet owners, animal lovers and aspiring pet-care professionals.
        </Text>

        <TouchableOpacity
          style={styles.goldButton}
          onPress={() => setScreen('overview')}
        >
          <Text style={styles.buttonText}>BOOK NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => setScreen('overview')}
        >
          <Text style={styles.buttonTextWhite}>VIEW COURSES</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>WHY CHOOSE US?</Text>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🐶 Professional Training</Text>
          <Text style={styles.cardText}>
            Practical training designed to develop useful pet-care skills.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>❤️ Caring Environment</Text>
          <Text style={styles.cardText}>
            We promote responsible, safe and compassionate animal care.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>🎓 Career Development</Text>
          <Text style={styles.cardText}>
            Courses are suitable for pet owners and aspiring professionals.
          </Text>
        </View>
      </View>

      <BottomNavigation />
    </ScrollView>
  );

  const AboutScreen = () => (
    <ScrollView>
      <Header />
      <Navigation />

      <View style={styles.page}>
        <Text style={styles.pageTitle}>ABOUT US</Text>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=900',
          }}
          style={styles.largeImage}
        />

        <Text style={styles.subTitle}>History of Pawsitive Pet Academy</Text>

        <Text style={styles.paragraph}>
          Pawsitive Pet Academy is a pet-care education and animal-training
          business founded by Sarah Smith in Durban in 2023.
        </Text>

        <Text style={styles.paragraph}>
          The academy provides practical training and education for pet owners,
          animal lovers and people interested in developing professional
          animal-care skills.
        </Text>

        <Text style={styles.subTitle}>About Sarah</Text>

        <Text style={styles.paragraph}>
          Sarah is passionate about animal welfare and believes that education
          can help people provide better care for their pets.
        </Text>

        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Our Mission</Text>
          <Text style={styles.cardText}>
            To provide trustworthy, practical and caring pet-care education.
          </Text>
        </View>
      </View>

      <BottomNavigation />
    </ScrollView>
  );

  const OverviewScreen = () => (
    <ScrollView>
      <Header />
      <Navigation />

      <View style={styles.page}>
        <Text style={styles.pageTitle}>COURSES</Text>

        <Text style={styles.categoryTitle}>SIX-MONTH COURSES</Text>

        {courses.slice(0, 4).map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseRow}
            onPress={() => openCourse(course)}
          >
            <Image source={{ uri: course.image }} style={styles.smallImage} />

            <View style={styles.courseRowInfo}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.price}>R{course.price}</Text>

              <Text style={styles.duration}>{course.duration}</Text>

              <View style={styles.miniButton}>
                <Text style={styles.miniButtonText}>APPLY</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={styles.categoryTitle}>SIX-WEEK COURSES</Text>

        {courses.slice(4).map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseRow}
            onPress={() => openCourse(course)}
          >
            <Image source={{ uri: course.image }} style={styles.smallImage} />

            <View style={styles.courseRowInfo}>
              <Text style={styles.courseName}>{course.name}</Text>
              <Text style={styles.price}>R{course.price}</Text>

              <Text style={styles.duration}>{course.duration}</Text>

              <View style={styles.miniButton}>
                <Text style={styles.miniButtonText}>APPLY</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <BottomNavigation />
    </ScrollView>
  );

  const CourseScreen = () => (
    <ScrollView>
      <Header />
      <Navigation />

      <View style={styles.page}>
        <Text style={styles.pageTitle}>{selectedCourse.name}</Text>

        <Image
          source={{ uri: selectedCourse.image }}
          style={styles.largeImage}
        />

        <View style={styles.highlight}>
          <Text style={styles.highlightText}>
            {selectedCourse.duration}
          </Text>

          <Text style={styles.highlightText}>
            R{selectedCourse.price}
          </Text>
        </View>

        <Text style={styles.subTitle}>COURSE DESCRIPTION</Text>

        <Text style={styles.paragraph}>
          {selectedCourse.description}
        </Text>

        <TouchableOpacity
          style={styles.goldButton}
          onPress={() => {
            toggleCourse(selectedCourse.id);
            Alert.alert(
              'Course Selected',
              `${selectedCourse.name} has been added to your courses.`
            );
          }}
        >
          <Text style={styles.buttonText}>APPLY NOW</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.greenButton}
          onPress={() => setScreen('fees')}
        >
          <Text style={styles.buttonTextWhite}>CALCULATE FEES</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
    </ScrollView>
  );

  const FeesScreen = () => (
    <ScrollView>
      <Header />
      <Navigation />

      <View style={styles.page}>
        <Text style={styles.pageTitle}>CALCULATE FEES</Text>

        <Text style={styles.instructions}>
          Select the courses you would like to take.
        </Text>

        {courses.map((course) => {
          const selected = selectedCourses.includes(course.id);

          return (
            <TouchableOpacity
              key={course.id}
              style={[
                styles.selectRow,
                selected && styles.selectedRow,
              ]}
              onPress={() => toggleCourse(course.id)}
            >
              <View>
                <Text style={styles.selectCourseName}>
                  {course.name}
                </Text>
                <Text>R{course.price}</Text>
              </View>

              <View
                style={[
                  styles.selectButton,
                  selected && styles.selectedButton,
                ]}
              >
                <Text style={styles.selectButtonText}>
                  {selected ? 'SELECTED' : 'SELECT'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.totalBox}>
          <Text style={styles.totalLine}>
            Selected courses: {selectedCourses.length}
          </Text>

          <Text style={styles.totalLine}>
            Subtotal: R{result.subtotal.toFixed(2)}
          </Text>

          <Text style={styles.totalLine}>
            Discount: {result.discount}%
          </Text>

          <Text style={styles.totalLine}>
            Discount amount: R{result.discountAmount.toFixed(2)}
          </Text>

          <Text style={styles.finalPrice}>
            TOTAL PRICE: R{result.total.toFixed(2)}
          </Text>
        </View>

        <Text style={styles.discountTitle}>DISCOUNT RULES</Text>

        <Text style={styles.discountText}>
          1 course = 0% discount
        </Text>

        <Text style={styles.discountText}>
          2 courses = 5% discount
        </Text>

        <Text style={styles.discountText}>
          3 courses = 10% discount
        </Text>

        <Text style={styles.discountText}>
          More than 3 courses = 15% discount
        </Text>

        <TouchableOpacity
          style={styles.goldButton}
          onPress={() =>
            Alert.alert(
              'Payment Confirmation',
              `Your total is R${result.total.toFixed(2)}`
            )
          }
        >
          <Text style={styles.buttonText}>CONFIRM PAYMENT</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
    </ScrollView>
  );

  const ContactScreen = () => (
    <ScrollView>
      <Header />
      <Navigation />

      <View style={styles.page}>
        <Text style={styles.pageTitle}>CONTACT US</Text>

        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=900',
          }}
          style={styles.largeImage}
        />

        <Text style={styles.subTitle}>FIND US AT:</Text>

        <Text style={styles.contactText}>📞 0800 588 2300</Text>
        <Text style={styles.contactText}>
          ✉ pawsitiveacademy@gmail.com
        </Text>
        <Text style={styles.contactText}>📍 Durban, South Africa</Text>

        <Text style={styles.subTitle}>SEND US A MESSAGE</Text>

        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your message"
          value={message}
          onChangeText={setMessage}
          multiline
        />

        <TouchableOpacity
          style={styles.goldButton}
          onPress={() => {
            if (!name || !email || !message) {
              Alert.alert('Missing information', 'Please complete all fields.');
              return;
            }

            Alert.alert(
              'Message Sent',
              'Thank you. Pawsitive Pet Academy will contact you.'
            );

            setName('');
            setEmail('');
            setMessage('');
          }}
        >
          <Text style={styles.buttonText}>SEND MESSAGE</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
    </ScrollView>
  );

  if (screen === 'home') return <HomeScreen />;
  if (screen === 'about') return <AboutScreen />;
  if (screen === 'overview') return <OverviewScreen />;
  if (screen === 'course') return <CourseScreen />;
  if (screen === 'fees') return <FeesScreen />;
  if (screen === 'contact') return <ContactScreen />;

  return <HomeScreen />;
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.lightBlue,
    paddingTop: 45,
    paddingBottom: 10,
    alignItems: 'center',
  },

  logoText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: COLORS.forest,
  },

  logoSub: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    letterSpacing: 2,
  },

  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.forest,
    paddingVertical: 10,
  },

  navText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },

  heroImage: {
    width: '100%',
    height: 230,
  },

  hero: {
    backgroundColor: COLORS.lightBlue,
    padding: 20,
    alignItems: 'center',
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.darkGreen,
    marginBottom: 12,
  },

  heroText: {
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 20,
    color: COLORS.black,
  },

  page: {
    backgroundColor: COLORS.lightBlue,
    padding: 15,
    minHeight: 600,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginBottom: 15,
    textAlign: 'center',
  },

  section: {
    backgroundColor: COLORS.lightBlue,
    padding: 15,
  },

  sectionTitle: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginBottom: 15,
  },

  categoryTitle: {
    backgroundColor: COLORS.forest,
    color: COLORS.white,
    padding: 10,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },

  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginTop: 18,
    marginBottom: 10,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.black,
    marginBottom: 10,
  },

  largeImage: {
    width: '100%',
    height: 210,
    borderRadius: 10,
    marginBottom: 15,
  },

  smallImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },

  infoCard: {
    backgroundColor: COLORS.lightGreen,
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginBottom: 5,
  },

  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },

  courseRow: {
    backgroundColor: COLORS.lightGreen,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },

  courseRowInfo: {
    flex: 1,
    paddingLeft: 10,
  },

  courseName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
  },

  price: {
    fontWeight: 'bold',
    marginTop: 4,
  },

  duration: {
    fontSize: 12,
    color: COLORS.grey,
  },

  miniButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 5,
  },

  miniButtonText: {
    fontWeight: 'bold',
    fontSize: 11,
  },

  goldButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    width: '85%',
    alignSelf: 'center',
  },

  greenButton: {
    backgroundColor: COLORS.forest,
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: '85%',
    alignSelf: 'center',
  },

  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 15,
  },

  buttonTextWhite: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },

  highlight: {
    backgroundColor: COLORS.lightGreen,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    borderRadius: 10,
  },

  highlightText: {
    fontWeight: 'bold',
    color: COLORS.darkGreen,
  },

  instructions: {
    textAlign: 'center',
    marginBottom: 15,
  },

  selectRow: {
    backgroundColor: COLORS.lightGreen,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectedRow: {
    borderWidth: 2,
    borderColor: COLORS.forest,
  },

  selectCourseName: {
    fontWeight: 'bold',
    maxWidth: 200,
  },

  selectButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 15,
  },

  selectedButton: {
    backgroundColor: COLORS.forest,
  },

  selectButtonText: {
    fontWeight: 'bold',
    fontSize: 10,
  },

  totalBox: {
    backgroundColor: COLORS.white,
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
  },

  totalLine: {
    fontSize: 15,
    marginBottom: 7,
  },

  finalPrice: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginTop: 10,
  },

  discountTitle: {
    fontWeight: 'bold',
    color: COLORS.darkGreen,
    marginTop: 20,
    marginBottom: 5,
  },

  discountText: {
    marginBottom: 5,
  },

  contactText: {
    fontSize: 16,
    marginBottom: 12,
  },

  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.forest,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  bottomNav: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 9,
  },

  bottomIcon: {
    textAlign: 'center',
    fontSize: 19,
  },

  bottomText: {
    fontSize: 10,
    textAlign: 'center',
    color: COLORS.darkGreen,
  },
});
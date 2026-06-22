export const ASSESSMENTS = [
  {
    id: 'anxiety',
    title: 'Self-Test for Anxiety',
    description: 'Check your anxiety level. Learn how to stay calm and manage worry.',
    image: 'https://images.unsplash.com/photo-1518244353890-1090299dbe9e?w=500&auto=format&fit=crop&q=60',
    duration: '03 min',
    questionsCount: '7 questions',
    details: "Anxiety is the body's natural response to stress. It involves feelings of apprehension, nervous tension, or dread. While occasional anxiety is normal, persistent or severe anxiety can interfere with daily activities. This self-test evaluates generalized anxiety levels using standard clinical indicators to help you map your state.",
    symptoms: [
      'Excessive, uncontrollable worrying',
      'Restlessness or feeling keyed up',
      'Fatigue or quick depletion of energy',
      'Difficulty concentrating or mind going blank',
      'Muscle tension, especially in shoulders and neck',
      'Irritability or low frustration tolerance',
      'Sleep disturbances (trouble falling or staying asleep)'
    ],
    dos: [
      'Practice structured breathing exercises like box breathing',
      'Engage in daily low-intensity physical movement',
      'Maintain a regular sleep and waking routine',
      'Discuss feelings with a trusted friend or therapist'
    ],
    donts: [
      'Consume high amounts of caffeine or energy drinks',
      'Isolate yourself from social interactions',
      'Ignore persistent physical tension symptoms',
      'Over-schedule your calendar without recovery blocks'
    ],
    questions: [
      { text: 'Feeling nervous, anxious, or on edge', circleNum: 1 },
      { text: 'Not being able to stop or control worrying', circleNum: 2 },
      { text: 'Worrying too much about different things', circleNum: 3 },
      { text: 'Trouble relaxing', circleNum: 4 },
      { text: 'Being so restless that it is hard to sit still', circleNum: 5 },
      { text: 'Becoming easily annoyed or irritable', circleNum: 6 },
      { text: 'Feeling afraid as if something awful might happen', circleNum: 7 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Ms. Manvi Shah',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 4, label: 'Minimal Anxiety', summary: 'You are experiencing minimal anxiety. Maintain your healthy physical movement and somatic balance.', recommendations: ['Practice Box Breathing twice a day', 'Take short early morning walks in sunlight'] },
        { min: 5, max: 9, label: 'Mild Anxiety', summary: 'Your score suggests mild anxiety. Focus on calming your baseline autonomic nervous system.', recommendations: ['Do daily mobility flows to release somatic tension', 'Limit caffeine and stimulants after 2:00 PM', 'Log triggers in your tools section'] },
        { min: 10, max: 14, label: 'Moderate Anxiety', summary: 'You show moderate anxiety. Specialized cognitive behavioral techniques can help reframe worry loops.', recommendations: ['Schedule a free consultation to map coping mechanisms', 'Practice the 5-4-3-2-1 grounding technique during spikes', 'Explore guided cognitive rest exercises'] },
        { min: 15, max: 28, label: 'Severe Anxiety', summary: 'Your score indicates severe anxiety. We strongly advise booking a free pro-bono session with a certified specialist.', recommendations: ['Schedule a free consultation immediately', 'Limit screen time and social feeds', 'Maintain consistent timings for meals and sleep'] }
      ]
    }
  },
  {
    id: 'burnout',
    title: 'Occupational Burnout',
    description: 'Spot early signs of workplace burnout. Recharge effectively and find energy.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60',
    duration: '04 min',
    questionsCount: '10 questions',
    details: "Burnout is a state of physical, emotional, and mental exhaustion caused by excessive and prolonged workplace stress. It occurs when you feel overwhelmed, emotionally drained, and unable to meet constant demands. This screening helps assess your levels of career fatigue, cynicism, and efficacy.",
    symptoms: [
      'Chronic exhaustion and lack of physical energy',
      'Cynicism or detachment from job responsibilities',
      'Feelings of ineffectiveness or lack of accomplishment',
      'Frequent headaches, stomachaches, or back pain',
      'Difficulty concentrating on work tasks',
      'Irritability with colleagues or clients'
    ],
    dos: [
      'Set clear boundaries for work hours and notifications',
      'Incorporate short movement breaks during desk hours',
      'Communicate workload challenges to supervisors',
      'Prioritize hobbies unrelated to your professional output'
    ],
    donts: [
      'Check work emails during weekends or late at night',
      'Use alcohol or screens as a primary escape from stress',
      'Compensate for fatigue by consuming more caffeine',
      'Ignore early signs of cynicism or dread'
    ],
    questions: [
      { text: 'I feel physically and emotionally exhausted at the end of the workday.', circleNum: 1 },
      { text: 'I find myself feeling cynical or detached from my tasks and colleagues.', circleNum: 2 },
      { text: 'I struggle to find motivation or energy to start my work in the morning.', circleNum: 3 },
      { text: 'I feel that my contributions at work go unnoticed or are undervalued.', circleNum: 4 },
      { text: 'I experience physical symptoms like headaches or muscle stiffness due to work pressure.', circleNum: 5 },
      { text: 'I find it hard to concentrate or stay productive during work hours.', circleNum: 6 },
      { text: 'I feel a sense of dread when thinking about the upcoming workweek.', circleNum: 7 },
      { text: 'I have less patience and get easily irritated with clients or team members.', circleNum: 8 },
      { text: 'I feel that I have little to no control over my work volume or schedule.', circleNum: 9 },
      { text: 'I find myself disconnecting or spacing out to escape work thoughts.', circleNum: 10 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Mr. Rahul Sharma',
        severe: 'Mrs. Anjali Krishnani'
      },
      ranges: [
        { min: 0, max: 9, label: 'Minimal Burnout', summary: 'You are maintaining a healthy balance between work outputs and personal recovery.', recommendations: ['Set clear cut-off times for work notifications', 'Take a 5-minute movement break every 2 hours'] },
        { min: 10, max: 19, label: 'Mild Burnout', summary: 'You are showing signs of exhaustion. It is time to prioritize mental boundary settings.', recommendations: ['Implement a strict 1-hour screen-free window before sleep', 'Schedule 15 minutes of quiet downtime during your workday', 'Practice dynamic breathing between tasks'] },
        { min: 20, max: 40, label: 'Moderate Burnout', summary: 'You show moderate burnout. Active recovery and postural decompression are recommended.', recommendations: ['Book a consultation with our desk-work specialist', 'Take a full weekend digital detox', 'Engage in mobility flows to release back tension'] }
      ]
    }
  },
  {
    id: 'fomo',
    title: 'FOMO Assessment',
    description: 'Check your fear of missing out. Stay present and content in the moment.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=60',
    duration: '03 min',
    questionsCount: '8 questions',
    details: "FOMO is the social anxiety characterized by a desire to stay continually connected with what others are doing. It is heavily amplified by social media and often leads to sleep disruption, digital fatigue, and reduced life satisfaction. This assessment checks your dependency on staying constantly updated.",
    symptoms: [
      'Checking notifications immediately upon waking or during tasks',
      'Anxiety when seeing friends at events you missed',
      'Constantly refreshing social feeds',
      'Neglecting real-life interactions to check your phone',
      'Saying yes to social plans despite exhaustion'
    ],
    dos: [
      'Establish phone-free zones, such as the dining table',
      'Turn off non-essential notifications on social apps',
      'Practice present-moment awareness and offline hobbies',
      'Take regular weekend digital detoxes'
    ],
    donts: [
      'Keep your phone next to your pillow overnight',
      'Compare your behind-the-scenes life to others\' highlight reels',
      'Multi-task by scrolling during conversations',
      'Agree to events solely out of social guilt'
    ],
    questions: [
      { text: 'Every time a notification pops up, I instantly open it and read it.', circleNum: 1 },
      { text: 'I feel anxious when I see my friends sharing photos of events I did not attend.', circleNum: 2 },
      { text: 'I constantly refresh my social media feeds to see what others are doing.', circleNum: 3 },
      { text: 'I feel a strong need to stay connected to my phone even during meals.', circleNum: 4 },
      { text: 'I worry that my friends are having more rewarding experiences than me.', circleNum: 5 },
      { text: 'I say yes to social outings even when I am physically exhausted and need rest.', circleNum: 6 },
      { text: 'I feel left out when others talk about plans I was not a part of.', circleNum: 7 },
      { text: 'I worry that if I do not stay online, I will lose touch with my social circles.', circleNum: 8 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Ms. Manvi Shah',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 8, label: 'Low FOMO', summary: 'You are securely grounded in the present. You appreciate your personal time and set digital limits.', recommendations: ['Continue practicing screen-free mornings', 'Use your focus hours to read or walk outdoors'] },
        { min: 9, max: 16, label: 'Moderate FOMO', summary: 'You sometimes feel anxious about missing updates. Developing simple offline rituals will help.', recommendations: ['Turn off non-essential notifications', 'Log your screen triggers in a digital journal', 'Engage in a physical hobby without sharing it online'] },
        { min: 17, max: 32, label: 'High FOMO', summary: 'You experience significant digital anxiety. A structured screen boundaries blueprint is recommended.', recommendations: ['Book a free session to structure cognitive grounding', 'Keep your phone out of the bedroom overnight', 'Practice Box Breathing when digital anxiety spikes'] }
      ]
    }
  },
  {
    id: 'selfcare',
    title: 'Self Care Check',
    description: 'See how well you care for yourself. Prioritize your physical and mental health.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60',
    duration: '05 min',
    questionsCount: '10 questions',
    details: "Self-care is any activity that we do deliberately in order to take care of our mental, emotional, and physical health. It is key to improved mood, reduced anxiety, and healthy relationships. This self-test measures how effectively you prioritize your own foundational needs.",
    symptoms: [
      'Feeling chronically overwhelmed or run down',
      'Neglecting nutrition, hydration, and exercise',
      'Poor sleep hygiene and daytime fatigue',
      'Lack of patience or empathy for yourself',
      'Struggling to say no to requests, leading to chronic resentment'
    ],
    dos: [
      'Schedule downtime in your calendar and protect it',
      'Consume balanced, gut-healthy meals consistently',
      'Engage in gentle stretching and physical self-care',
      'Practice self-compassion when things go wrong'
    ],
    donts: [
      'Feel guilty for taking time to rest and recharge',
      'Wait until you are fully burnt out to rest',
      'Neglect basic hydration and movement during busy days',
      'Set unrealistic wellness expectations that cause more stress'
    ],
    questions: [
      { text: 'I schedule regular downtime for myself without feeling guilty.', circleNum: 1 },
      { text: 'I maintain a consistent sleep schedule that leaves me feeling rested.', circleNum: 2 },
      { text: 'I listen to my body\'s signals of hunger, thirst, or fatigue and act on them.', circleNum: 3 },
      { text: 'I set healthy personal boundaries and say "no" to excessive demands.', circleNum: 4 },
      { text: 'I engage in a hobby or activity simply for the joy of it, not productivity.', circleNum: 5 },
      { text: 'I prioritize eating nourishing, whole meals most days of the week.', circleNum: 6 },
      { text: 'I spend time outdoors or in nature to recharge my mental state.', circleNum: 7 },
      { text: 'I seek support from friends, family, or professionals when under stress.', circleNum: 8 },
      { text: 'I practice gentle physical movement or stretching to release body tension.', circleNum: 9 },
      { text: 'I speak to myself with kindness and compassion when making mistakes.', circleNum: 10 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Mrs. Anjali Krishnani',
        severe: 'Dr. Mala Patel'
      },
      ranges: [
        { min: 0, max: 12, label: 'Needs Attention', summary: 'You are placing self-care on the backburner. Prioritizing your own needs is essential for health.', recommendations: ['Start with just 5 minutes of stretching daily', 'Set a consistent sleep time tonight', 'Book a free consultation to map basic habits'] },
        { min: 13, max: 22, label: 'Moderate Self-Care', summary: 'You have some good habits, but skip them under pressure. Consistency is your next step.', recommendations: ['Schedule your downtime in your calendar like a meeting', 'Incorporate gut-healthy staples into meals', 'Practice the Breathing Guide during stressful workdays'] },
        { min: 23, max: 40, label: 'Excellent Self-Care', summary: 'Congratulations! You actively listen to your body and protect your mental boundaries.', recommendations: ['Continue sharing your wellness routines with friends', 'Explore advanced mobility and strength training'] }
      ]
    }
  },
  {
    id: 'ptsd',
    title: 'PTSD Screening',
    description: 'Identify trauma effects and nervous system triggers. Take steps toward healing.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60',
    duration: '03 min',
    questionsCount: '8 questions',
    details: "Post-Traumatic Stress Disorder (PTSD) can occur after experiencing or witnessing a traumatic event. It affects the autonomic nervous system, keeping it in a state of high alarm. This brief screening checks for trauma-related indicators and hyperarousal patterns.",
    symptoms: [
      'Vivid flashbacks or intrusive distressing memories',
      'Active avoidance of trauma reminders',
      'Hypervigilance or feeling constantly on guard',
      'Difficulty falling or staying asleep due to memories',
      'Emotional numbness or detachment from loved ones',
      'Spontaneous anger or panic triggers'
    ],
    dos: [
      'Engage in gentle somatic grounding practices',
      'Establish a highly predictable daily routine',
      'Build a supportive community connection',
      'Consult a certified trauma specialist'
    ],
    donts: [
      'Force yourself to relive or talk about trauma prematurely',
      'Numb feelings with alcohol or substances',
      'Isolate yourself from loved ones when triggered',
      'Ignore persistent physical panic sensations'
    ],
    questions: [
      { text: 'I experience vivid, upsetting memories or flashbacks of a past stressful event.', circleNum: 1 },
      { text: 'I actively avoid places, conversations, or thoughts that remind me of past trauma.', circleNum: 2 },
      { text: 'I feel constantly on guard, hyper-vigilant, or easily startled.', circleNum: 3 },
      { text: 'I have difficulty falling asleep or staying asleep due to intrusive memories.', circleNum: 4 },
      { text: 'I feel emotionally numb or detached from people I used to care about.', circleNum: 5 },
      { text: 'I experience sudden spikes of anger, irritability, or panic without a clear cause.', circleNum: 6 },
      { text: 'I blame myself or feel intense guilt regarding past stressful events.', circleNum: 7 },
      { text: 'I find it difficult to experience positive emotions like happiness or love.', circleNum: 8 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Ms. Manvi Shah',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 8, label: 'Minimal Indicators', summary: 'You are showing minimal signs of post-traumatic stress. Your nervous system is stable.', recommendations: ['Maintain gentle mindfulness routines', 'Write thoughts in a personal journal weekly'] },
        { min: 9, max: 16, label: 'Moderate Indicators', summary: 'You are experiencing moderate trauma effects. Somatic grounding and CBT can provide relief.', recommendations: ['Book a free consultation to speak with a clinical specialist', 'Practice Box Breathing to calm autonomic hyper-arousal', 'Log emotional triggers in a journal'] },
        { min: 17, max: 32, label: 'High Indicators', summary: 'Your score suggests significant trauma symptoms. Speaking with a certified psychologist is highly recommended.', recommendations: ['Book a free pro-bono consultation with Ms. Manvi Shah immediately', 'Focus on somatic breathing exercises twice daily', 'Establish a highly predictable daily routine'] }
      ]
    }
  },
  {
    id: 'digital',
    title: 'Digital Well-Being',
    description: 'Balance screen time, escape doom-scrolling, and regain control of your day.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60',
    duration: '04 min',
    questionsCount: '10 questions',
    details: "Digital well-being is about having a healthy relationship with technology. Excess screen use can fragment attention, damage sleep cycles, and cause physical strain. This assessment evaluates screen dependency and helps restore digital boundaries.",
    symptoms: [
      'Doom-scrolling social media without purpose',
      'Using your phone in bed, causing insomnia',
      'Restlessness when your phone is out of reach',
      'Experiencing dry eyes, neck stiffness, or hand strain',
      'Neglecting offline tasks for screen activities'
    ],
    dos: [
      'Charge your phone outside the bedroom overnight',
      'Set daily app time limits and adhere to them',
      'Use gray-scale screen mode to reduce visual triggers',
      'Engage in screen-free walking or outdoor breaks'
    ],
    donts: [
      'Scroll your phone immediately upon waking',
      'Use screens as your primary tool to cure boredom',
      'Check notifications during face-to-face conversations',
      'Ignore physical signs of eye or neck strain'
    ],
    questions: [
      { text: 'I look at my phone first thing in the morning upon waking.', circleNum: 1 },
      { text: 'I find myself doom-scrolling social media without a specific purpose.', circleNum: 2 },
      { text: 'I struggle to fall asleep because I am using my phone in bed.', circleNum: 3 },
      { text: 'I feel anxious or restless if my phone is not in the same room.', circleNum: 4 },
      { text: 'I lose track of time when browsing social feeds or watching short videos.', circleNum: 5 },
      { text: 'I look at my phone when I am in the middle of face-to-face conversations.', circleNum: 6 },
      { text: 'I feel overwhelmed by the constant stream of notifications and alerts.', circleNum: 7 },
      { text: 'I use my phone as a primary escape from feelings of boredom or loneliness.', circleNum: 8 },
      { text: 'I have tried to reduce my daily screen time but failed to maintain the limit.', circleNum: 9 },
      { text: 'I experience dry eyes, neck tension, or hand stiffness from device usage.', circleNum: 10 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Mr. Rahul Sharma',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 9, label: 'Healthy Relationship', summary: 'You maintain a balanced connection with your devices. Your attention remains self-directed.', recommendations: ['Continue using screen-free bedrooms', 'Maintain your offline hobbies and routines'] },
        { min: 10, max: 19, label: 'Moderate Screen Anxiety', summary: 'Devices are beginning to fragment your attention span and sleep cycle. Setting limits will help.', recommendations: ['Put a physical charging dock outside your bedroom', 'Disable all social media app notifications', 'Use the breathing guide during transitions'] },
        { min: 20, max: 40, label: 'High Screen Dependence', summary: 'Your screen time is causing physical strain and sleeping disruptions. A screen detox plan is advised.', recommendations: ['Book a free consultation to map attention restoration', 'Use gray-scale mode on your phone screen', 'Take a 24-hour full weekend screen detox'] }
      ]
    }
  },
  {
    id: 'stress',
    title: 'Stress Scale',
    description: 'Measure your cognitive and physical stress levels. Take small steps to regulate.',
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=60',
    duration: '04 min',
    questionsCount: '10 questions',
    details: "Stress is a natural physical and mental reaction to life experiences. While short-term stress is normal, chronic stress leads to muscle tension, poor digestion, and cognitive fatigue. This test measures your perceived stress levels and coping limits.",
    symptoms: [
      'Feeling overwhelmed by everyday responsibilities',
      'Losing your temper or snapping over minor issues',
      'Tight shoulders, neck, or a clenched jaw',
      'Difficulty quietening your mind in the evening',
      'Digestive discomfort, bloating, or acid reflux'
    ],
    dos: [
      'Decompress joints and stretch every two hours at work',
      'Complete a full box breathing cycle when stress spikes',
      'Log stress patterns to identify recurring triggers',
      'Consume a gut-friendly, anti-inflammatory diet'
    ],
    donts: [
      'Overwhelm yourself with tasks without scheduled recovery',
      'Rely on sugar or caffeine to manage energy crashes',
      'Bottle up pressure instead of expressing it',
      'Neglect movement and outdoor air when busy'
    ],
    questions: [
      { text: 'I feel overwhelmed by the number of responsibilities I have.', circleNum: 1 },
      { text: 'I find myself losing my temper or snapping over minor issues.', circleNum: 2 },
      { text: 'I experience physical tension, such as a clenched jaw or tight shoulders.', circleNum: 3 },
      { text: 'I struggle to quiet my mind and relax in the evenings.', circleNum: 4 },
      { text: 'I feel constantly rushed and unable to keep up with daily tasks.', circleNum: 5 },
      { text: 'I experience frequent digestive discomfort or bloating.', circleNum: 6 },
      { text: 'I find it difficult to concentrate or make decisions due to mental clutter.', circleNum: 7 },
      { text: 'I feel emotionally exhausted or close to tears under pressure.', circleNum: 8 },
      { text: 'I use substances or passive screens to numb my daily pressures.', circleNum: 9 },
      { text: 'I feel that I have too little time for activities that bring me joy.', circleNum: 10 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Mrs. Anjali Krishnani',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 9, label: 'Minimal Stress', summary: 'You are experiencing minimal baseline stress. Your body and mind are regulating successfully.', recommendations: ['Continue daily mobility or stretching checks', 'Practice a 3-minute breathing session in mornings'] },
        { min: 10, max: 19, label: 'Moderate Stress', summary: 'You have elevated stress levels. Tension is accumulating in your muscles and digestion.', recommendations: ['Do a 10-minute gut-detox diet check daily', 'Schedule a free session to learn stress containment', 'Decompress joints every 2 hours at your desk'] },
        { min: 20, max: 40, label: 'High Stress', summary: 'Your stress levels are clinically high. We recommend connecting with a counseling specialist.', recommendations: ['Book a free consultation with Ms. Manvi Shah', 'Complete a full box breathing cycle twice daily', 'Decompress joints every 2 hours at your desk'] }
      ]
    }
  },
  {
    id: 'superpower',
    title: 'What\'s Your Superpower?',
    description: 'This is a self-discovery quiz to uncover your unique emotional and cognitive strengths.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60',
    duration: '03 min',
    questionsCount: '8 questions',
    details: "Every individual possesses unique emotional, cognitive, and social strengths. Uncovering your personal superpower helps you understand how you best relate to others, solve problems, and handle stress. This quiz highlights your core traits.",
    symptoms: [
      'Feeling misaligned with your current daily routines',
      'Struggling to describe your key soft-skills',
      'Seeking to build stronger personal relationships',
      'Wanting to align your career with personal strengths'
    ],
    dos: [
      'Acknowledge and lean into your primary strength profile',
      'Seek opportunities to mentor or guide others',
      'Combine logical planning with emotional empathy',
      'Keep structural records of your personal achievements'
    ],
    donts: [
      'Try to fit into styles that conflict with your core strengths',
      'Downplay your soft skills as unimportant',
      'Ignore the strengths of teammates around you',
      'Let self-doubt override your natural capabilities'
    ],
    questions: [
      { text: 'I find it natural to calm down friends who are in distress.', circleNum: 1 },
      { text: 'I love analyzing complex details and spotting logical patterns.', circleNum: 2 },
      { text: 'I feel highly energized when coming up with creative ideas.', circleNum: 3 },
      { text: 'I am the person who coordinates plans and keeps the team organized.', circleNum: 4 },
      { text: 'I feel deeply satisfied when helping others reach their personal goals.', circleNum: 5 },
      { text: 'I am resilient and stay calm and focused during stressful crises.', circleNum: 6 },
      { text: 'I express my thoughts clearly and can persuade others easily.', circleNum: 7 },
      { text: 'I am a great listener who notices minor details about how others feel.', circleNum: 8 }
    ],
    scoring: {
      type: 'discovery',
      ranges: [
        { min: 0, max: 9, label: 'The Analyst', summary: 'Your primary strength is logical structuring, detail analysis, and finding optimal pathways.', recommendations: ['Utilize progressive loading routines', 'Keep structural workout logs'] },
        { min: 10, max: 17, label: 'The Empath', summary: 'Your primary strength is deep listening, emotional support, and understanding relationships.', recommendations: ['Practice somatic anxiety regulation', 'Engage in community yoga and breathing sessions'] },
        { min: 18, max: 32, label: 'The Catalyst', summary: 'Your primary strength is creative ideation, motivating teams, and resolving crises with action.', recommendations: ['Optimize Zone 2 cardiovascular stamina', 'Structure gut-healthy diet regimes'] }
      ]
    }
  },
  {
    id: 'depression',
    title: 'PHQ-9 Mood Assessment',
    description: 'Check depression and mood indicators over the past two weeks with standard PHQ-9.',
    image: 'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=500&auto=format&fit=crop&q=60',
    duration: '04 min',
    questionsCount: '9 questions',
    details: "The Patient Health Questionnaire (PHQ-9) is a standard clinical instrument used to monitor severity of depression and evaluate mood indicators. It checks key somatic and cognitive symptoms over the last two weeks to help guide care.",
    symptoms: [
      'Persistent low mood, sadness, or emptiness',
      'Loss of interest or pleasure in activities once enjoyed',
      'Significant changes in appetite or weight',
      'Sleeping too much or difficulty sleeping',
      'Feeling slowed down or extremely restless',
      'Fatigue or loss of energy daily',
      'Feelings of worthlessness or excessive guilt'
    ],
    dos: [
      'Establish small, manageable daily goals',
      'Engage in gentle physical movement like short walks',
      'Maintain regular social contacts, even briefly',
      'Seek guidance from a certified mental health professional'
    ],
    donts: [
      'Isolate yourself or withdraw completely from loved ones',
      'Set large, overwhelming goals that cause pressure',
      'Ignore changes in sleep patterns or energy',
      'Self-blame for feelings of low mood'
    ],
    questions: [
      { text: 'Little interest or pleasure in doing things', circleNum: 1 },
      { text: 'Feeling down, depressed, or hopeless', circleNum: 2 },
      { text: 'Trouble falling or staying asleep, or sleeping too much', circleNum: 3 },
      { text: 'Feeling tired or having little energy', circleNum: 4 },
      { text: 'Poor appetite or overeating', circleNum: 5 },
      { text: 'Feeling bad about yourself — or that you are a failure or have let yourself or your family down', circleNum: 6 },
      { text: 'Trouble concentrating on things, such as reading the newspaper or watching television', circleNum: 7 },
      { text: 'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual', circleNum: 8 },
      { text: 'Thoughts that you would be better off dead or of hurting yourself in some way', circleNum: 9 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Ms. Manvi Shah',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 4, label: 'Minimal Depression', summary: 'You are experiencing minimal depression indicators. Maintain daily sunlight exposure, social connection, and gentle walking.', recommendations: ['Walk 15 minutes outdoors every morning', 'Stay connected with family and friends'] },
        { min: 5, max: 9, label: 'Mild Depression', summary: 'Your score suggests mild depression indicators. Structuring sleep and daily movement will help.', recommendations: ['Walk 20 mins daily', 'Write in your journal twice weekly', 'Establish a strict sleeping window'] },
        { min: 10, max: 14, label: 'Moderate Depression', summary: 'You show moderate depression. Specialized somatic and mental guidance is recommended.', recommendations: ['Book a free consultation with a specialist', 'Prioritize whole, gut-friendly meals', 'Practice cognitive rest exercises daily'] },
        { min: 15, max: 36, label: 'Severe Depression', summary: 'Your score indicates severe depression indicators. We strongly suggest seeking certified clinical support.', recommendations: ['Book a free consultation with Ms. Manvi Shah immediately', 'Incorporate box breathing twice daily', 'Maintain consistent timings for meals and sleep'] }
      ]
    }
  },
  {
    id: 'sleep',
    title: 'Sleep Quality Index',
    description: 'Assess your sleep cycles, latency, and nighttime recovery over the past month.',
    image: 'https://images.unsplash.com/photo-1505305976870-c0be14402266?w=500&auto=format&fit=crop&q=60',
    duration: '04 min',
    questionsCount: '8 questions',
    details: "Sleep quality directly impacts cognitive performance, metabolic health, and emotional resilience. This test assesses your sleep patterns, latency, duration, and disturbances over the past month to highlight restorative habits.",
    symptoms: [
      'Taking more than 30 minutes to fall asleep',
      'Waking up frequently during the night',
      'Waking up feeling tired or unrefreshed',
      'Daytime sleepiness, fatigue, or low focus',
      'Tossing and turning due to physical restlessness'
    ],
    dos: [
      'Maintain a consistent bedtime and wake-up time',
      'Keep your bedroom cool, dark, and quiet',
      'Expose yourself to natural sunlight in the morning',
      'Use a relaxing wind-down routine before bed'
    ],
    donts: [
      'Look at screens or bright lights within 1 hour of sleep',
      'Consume caffeine, heavy meals, or alcohol near bedtime',
      'Exercise intensely close to your scheduled sleep time',
      'Stay in bed if you cannot fall asleep after 20 minutes'
    ],
    questions: [
      { text: 'I struggle to fall asleep within 30 minutes of going to bed.', circleNum: 1 },
      { text: 'I wake up in the middle of the night or early morning.', circleNum: 2 },
      { text: 'I feel tired and unrefreshed even after a full night\'s sleep.', circleNum: 3 },
      { text: 'I look at my phone or watch TV while trying to fall asleep.', circleNum: 4 },
      { text: 'I experience racing thoughts or worry when lying in bed.', circleNum: 5 },
      { text: 'I feel sleepy or lack energy to perform tasks during the day.', circleNum: 6 },
      { text: 'My sleep environment is noisy, too bright, or uncomfortable.', circleNum: 7 },
      { text: 'I wake up with physical tension, muscle stiffness, or headaches.', circleNum: 8 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Mr. Rahul Sharma',
        severe: 'Mrs. Anjali Krishnani'
      },
      ranges: [
        { min: 0, max: 8, label: 'Good Sleep Quality', summary: 'You maintain healthy, restorative sleep cycles. Keep protecting your night routine.', recommendations: ['Continue current sleep schedule', 'Keep your bedroom completely screen-free'] },
        { min: 9, max: 18, label: 'Moderate Sleep Issues', summary: 'Your sleep quality is moderately disrupted. Establishing digital boundaries before bed can assist.', recommendations: ['Set phone-free wind-down hour before bed', 'Avoid caffeine or heavy stimulants after 2:00 PM', 'Try 5 minutes of deep breathing in bed'] },
        { min: 19, max: 32, label: 'Poor Sleep Quality', summary: 'Your sleep is significantly disrupted, which affects your physical and mental energy. A somatic consultation is advised.', recommendations: ['Book a free consultation to map somatic sleep hygiene', 'Ensure your sleep environment is completely dark and cool', 'Practice PMR (Progressive Muscle Relaxation) before bed'] }
      ]
    }
  },
  {
    id: 'resilience',
    title: 'Resilience Scale',
    description: 'Check your cognitive flexibility, adaptiveness, and emotional coping capacity.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop&q=60',
    duration: '04 min',
    questionsCount: '8 questions',
    details: "Resilience is the capacity to adapt, bounce back, and grow stronger through adversity, stress, or tragedy. It is a dynamic cognitive and emotional skill that can be built over time. This scale assesses your adaptive coping capacity.",
    symptoms: [
      'Feeling easily defeated or overwhelmed by setbacks',
      'Struggling to adapt to changes or unexpected challenges',
      'Persistent pessimism or negative self-talk under stress',
      'Difficulty managing intense emotions during crises',
      'Feeling hopeless or stuck in difficult situations'
    ],
    dos: [
      'Practice cognitive reframing of negative events',
      'Focus on factors within your direct control',
      'Build and nurture a strong support network',
      'Acknowledge past challenges you have successfully overcome'
    ],
    donts: [
      'View setbacks as permanent or personal failures',
      'Over-focus on worst-case scenarios and catastrophize',
      'Reject help or support from friends and family',
      'Neglect physical self-care and sleep during stressful periods'
    ],
    questions: [
      { text: 'I am able to adapt quickly when changes or setbacks occur.', circleNum: 1 },
      { text: 'I can stay focused and think clearly under high pressure.', circleNum: 2 },
      { text: 'I tend to bounce back relatively fast after a difficult challenge.', circleNum: 3 },
      { text: 'I believe that challenges make me stronger and help me grow.', circleNum: 4 },
      { text: 'I can manage my emotions and remain calm during stressful events.', circleNum: 5 },
      { text: 'I have a strong support system that I can rely on when needed.', circleNum: 6 },
      { text: 'I focus on solutions rather than dwelling on the problem itself.', circleNum: 7 },
      { text: 'I can find positive aspects or lessons in difficult situations.', circleNum: 8 }
    ],
    scoring: {
      type: 'clinical',
      therapist: {
        moderate: 'Mrs. Anjali Krishnani',
        severe: 'Ms. Manvi Shah'
      },
      ranges: [
        { min: 0, max: 8, label: 'Low Resilience', summary: 'You are finding it difficult to cope with setbacks. Building deliberate cognitive coping tools is highly recommended.', recommendations: ['Book a free session to learn cognitive grounding', 'Focus only on one small task within your control', 'Practice deep breathing during emotional spikes'] },
        { min: 9, max: 17, label: 'Moderate Resilience', summary: 'You have good coping baselines but feel overwhelmed during high stress. Boundaries will support your adaptation.', recommendations: ['Set clear cognitive boundaries for work and home', 'Practice active mindfulness or daily journal logging', 'Reach out to your support circle during setbacks'] },
        { min: 18, max: 32, label: 'High Resilience', summary: 'Congratulations! You possess strong adaptive capacities. Use your resilience to anchor others while maintaining your limits.', recommendations: ['Support team members in stress', 'Keep challenging yourself with positive goals', 'Maintain consistent physical self-care'] }
      ]
    }
  }
];

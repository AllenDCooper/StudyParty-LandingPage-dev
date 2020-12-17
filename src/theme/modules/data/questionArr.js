const questionArr = [
  // {
  //   questionName: 'testType',
  //   questionText: 'Which test are you studying for?',
  //   answerOptionsArr: ['LSAT', 'GRE', 'GMAT', 'MCAT'],
  //   questionErrorMessage: 'Please select an option',
  //   questionType: 'dropdown'
  // },
  {
    questionName: 'testDate',
    questionText: 'What is your anticipated test date?',
    questionType: 'dateSelect'
  },
  {
    questionName: 'studyGroup',
    questionText: 'Are you looking for a study partner or group?',
    answerOptionsArr: ['Partner', 'Group', 'Not sure'],
    questionErrorMessage: 'Please select an option',
    questionType: 'dropdown'
  },
  {
    questionName: 'testPrep',
    questionText: 'How much test prep have you already done?',
    answerOptionsArr: ['A lot', 'A little', 'None'],
    questionErrorMessage: 'Please select an option',
    questionType: 'dropdown'
  },
  {
    questionName: 'targetScore',
    questionText: 'What is your target score?',
    answerOptionsArr: ['At least 60th percentile (~550 and up)', 'At least 70th percentile (~600 and up)', 'At least 80th percentile (~650 and up)', 'At least 90th percentile (~700 and up)', 'Not sure'],
    questionErrorMessage: 'Please select an option',
    questionType: 'dropdown'
  },
  {
    questionName: 'targetSection',
    questionText: 'Which GMAT section are you studying for the most?',
    answerOptionsArr: ['Quantitative', 'Verbal', 'Both'],
    questionErrorMessage: 'Please select an option',
    questionType: 'dropdown'
  },
  {
    questionName: 'availability',
    questionText: 'When are you available for your first study session? Please select at least three time slots. The more availability you indicate, the faster you’ll be matched with a study partner',
    questionErrorMessage: 'Please select at least three time slots',
    questionType: 'calendar'
  },
  {
    questionName: ['name', 'email'],
    questionText: ['Please provide your name and email address'],
    questionErrorMessage: ['Please enter your name', 'Please enter a valid email address'],
    questionType: 'multipleShortAnswer'
  },
]

export default questionArr;
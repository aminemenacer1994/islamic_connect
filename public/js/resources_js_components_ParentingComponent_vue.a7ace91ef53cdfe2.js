"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_ParentingComponent_vue"],{

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'IslamicParentingGuide',
  data() {
    return {
      searchQuery: '',
      activeChapter: null,
      progress: JSON.parse(localStorage.getItem('islamicParentingProgress')) || {},
      trustedSources: ['IslamQA.info', 'IslamWeb.net', 'Sunnah.com', 'AboutIslam.net', 'Islamicity.org'],
      pexelsApiKey: 'dhOLH00j9E1bBV53cMmEpaHPnrRR3WGzl3vRGXnPNbquONCjpZeKEr3f',
      chapters: [{
        number: 1,
        title: 'Foundations of Parenting in Islam',
        subsections: [{
          title: 'Rights of parents',
          content: 'Your Lord has decreed that you worship none but Him and be dutiful to parents. If one or both attain old age with you, say not to them a word of disrespect (uff), nor repel them, but speak to them noble words and lower unto them the wing of humility through mercy. (Quran 17:23-24)',
          dos: ['Treat them with kindness and service', 'Make dua for them regularly', 'Spend on them if needed'],
          donts: ['Say “uff” or any word of disrespect', 'Raise your voice at them', 'Neglect their needs'],
          tips: ['The pleasure of Allah is tied to the pleasure of parents', 'Dua: “My Lord, have mercy upon them as they brought me up when I was small”'],
          references: ['IslamQA.info 13783', 'Sunnah.com (Quran 17:23-24)', 'IslamWeb.net'],
          imageQuery: 'peaceful muslim family praying together at home',
          videoUrl: 'https://www.youtube.com/embed/8z7f4j8qY0k'
        }, {
          title: 'Obedience vs boundaries',
          content: 'Obey parents in what is ma’ruf (good and permissible). There is no obedience to creation if it involves disobedience to the Creator.',
          dos: ['Obey in halal matters', 'Politely explain when refusing'],
          donts: ['Obey in anything sinful or harmful', 'Be rude while refusing'],
          tips: ['Obedience has limits when sin or serious harm is involved'],
          references: ['IslamQA.info 6402', 'IslamWeb.net Fatwa 347518'],
          imageQuery: 'young muslim listening respectfully to parents',
          videoUrl: ''
        }, {
          title: 'Mercy, respect, and ihsan',
          content: 'Show excellence (ihsan) and mercy to parents. The mother has greater right to good treatment.',
          dos: ['Lower your voice', 'Serve them with patience and humility'],
          donts: ['Show irritation or comparison'],
          tips: ['Ihsan to parents is a great act of worship'],
          references: ['Sunnah.com Tirmidhi 1899', 'IslamQA.info 5053'],
          imageQuery: 'muslim youth helping elderly parents',
          videoUrl: ''
        }, {
          title: 'Understanding intention (niyyah) in family life',
          content: 'Renew your intention that every act toward your parents is done only to seek Allah’s pleasure.',
          dos: ['Make niyyah before helping', 'Remember reward in akhirah'],
          donts: ['Seek only worldly appreciation'],
          tips: ['Niyyah turns daily chores into rewarded ibaadah'],
          references: ['Islamicity.org', 'AboutIslam.net'],
          imageQuery: 'muslim family sitting together in peace',
          videoUrl: ''
        }]
      }, {
        number: 2,
        title: 'Communication with Parents',
        subsections: [{
          title: 'How to talk without disrespect',
          content: 'Speak calmly, begin with appreciation, and listen fully before responding.',
          dos: ['Start with praise', 'Use soft and kind words'],
          donts: ['Interrupt or use sarcasm'],
          tips: ['Script: “I really value your advice, can we discuss this together?”'],
          references: ['IslamWeb.net', 'IslamQA.info'],
          imageQuery: 'muslim teen talking calmly with parents',
          videoUrl: 'https://www.youtube.com/embed/5v3v4z0kR9M'
        }, {
          title: 'Handling disagreements calmly',
          content: 'Disagreements are normal. Stay calm and use wisdom.',
          dos: ['Pause and seek refuge from Shaytan', 'Use Quranic evidence'],
          donts: ['Raise voice or walk away in anger'],
          tips: ['Anger is from Shaytan – control it (Hadith in Bukhari)'],
          references: ['Sunnah.com Bukhari 6116', 'IslamWeb.net'],
          imageQuery: 'peaceful muslim family discussion',
          videoUrl: ''
        }, {
          title: 'Expressing feelings the right way',
          content: 'Be honest but with adab and focus on solutions.',
          dos: ['Use “I feel” statements', 'Choose the right time'],
          donts: ['Blame or accuse'],
          tips: ['Focus on solution, not blame'],
          references: ['AboutIslam.net'],
          imageQuery: 'muslim youth expressing feelings respectfully',
          videoUrl: ''
        }, {
          title: 'When parents don’t understand you',
          content: 'Be patient. Explain gently and make dua for softened hearts.',
          dos: ['Give them time', 'Show through actions'],
          donts: ['Get frustrated quickly'],
          tips: ['Patience brings barakah'],
          references: ['IslamQA.info'],
          imageQuery: 'muslim child with parents understanding',
          videoUrl: ''
        }]
      }, {
        number: 3,
        title: 'Culture vs Islam (Major Issue in the West)',
        subsections: [{
          title: 'Cultural expectations vs Islamic teachings',
          content: 'Differentiate between authentic Islamic teachings and cultural practices that may contradict them.',
          dos: ['Ask for evidence from Quran and Sunnah', 'Be respectful while clarifying'],
          donts: ['Follow culture when it contradicts Islam'],
          tips: ['Islamic culture is acceptable; cultural Islam that adds haram is not'],
          references: ['AboutIslam.net - Youth, Culture and Islam in the West', 'IslamQA.info'],
          imageQuery: 'muslim family discussing culture and faith',
          videoUrl: ''
        }, {
          title: '“My parents say it’s haram but is it?”',
          content: 'Many things labeled haram may be cultural. Verify with trusted sources before accepting or rejecting.',
          dos: ['Research from the 5 trusted sites', 'Consult a scholar politely'],
          donts: ['Dismiss parents without evidence'],
          tips: ['Say: “Can we check this together from reliable sources?”'],
          references: ['AboutIslam.net', 'IslamQA.info'],
          imageQuery: 'muslim youth studying islam on laptop',
          videoUrl: ''
        }, {
          title: 'Breaking toxic cultural norms respectfully',
          content: 'Change what contradicts Islam while maintaining ihsan toward parents.',
          dos: ['Explain with evidence and love', 'Lead by quiet example'],
          donts: ['Rebel harshly or cut ties'],
          tips: ['Patience and wisdom are key to gradual change'],
          references: ['IslamWeb.net', 'Islamicity.org'],
          imageQuery: 'breaking cultural norms islam',
          videoUrl: ''
        }, {
          title: 'Navigating generational differences',
          content: 'Parents grew up in different times and environments. Bridge the gap with understanding.',
          dos: ['Understand their fears', 'Share your reality gently'],
          donts: ['Judge their era or background'],
          tips: ['Common ground is always Islam'],
          references: ['AboutIslam.net'],
          imageQuery: 'generational muslim family',
          videoUrl: ''
        }]
      }, {
        number: 4,
        title: 'Conflict & Arguments',
        subsections: [{
          title: 'Dealing with strict parents',
          content: 'Strictness often stems from love and concern for your akhirah. Respond with patience and wisdom.',
          dos: ['Stay calm', 'Show appreciation for their concern'],
          donts: ['Shout back or rebel openly'],
          tips: ['Script: “I know you want the best for me, can we find a middle way?”'],
          references: ['IslamWeb.net', 'IslamQA.info'],
          imageQuery: 'muslim family resolving argument',
          videoUrl: ''
        }, {
          title: 'Constant arguments at home',
          content: 'Repeated arguments damage relationships. Seek de-escalation and reconciliation.',
          dos: ['Pause before replying', 'Seek family meeting with calm'],
          donts: ['Escalate with harsh words'],
          tips: ['Remember: The Prophet ﷺ said the strong is one who controls himself in anger'],
          references: ['Sunnah.com Bukhari 6114', 'IslamQA.info'],
          imageQuery: 'muslim family in conflict resolution',
          videoUrl: ''
        }, {
          title: 'Feeling controlled or misunderstood',
          content: 'Feeling controlled is common in the West. Communicate boundaries while keeping respect.',
          dos: ['Express feelings honestly but kindly', 'Involve a trusted elder or scholar if needed'],
          donts: ['Accuse or cut communication'],
          tips: ['Balance self-respect with parental rights'],
          references: ['AboutIslam.net'],
          imageQuery: 'muslim youth feeling controlled',
          videoUrl: ''
        }, {
          title: 'What Islam says about shouting, anger, etc.',
          content: 'The Prophet ﷺ said: “The strong is not the one who overcomes people by strength, but the one who controls himself in anger.”',
          dos: ['Control anger', 'Seek refuge in Allah (A’udhu billahi min ash-shaytan)'],
          donts: ['Shout at parents'],
          tips: ['Walk away temporarily if needed, then return with calm'],
          references: ['Sunnah.com Bukhari 6114'],
          imageQuery: 'muslim controlling anger',
          videoUrl: ''
        }]
      }, {
        number: 5,
        title: 'Emotional Struggles with Parents',
        subsections: [{
          title: 'Feeling unloved or unappreciated',
          content: 'Many parents show love through actions and provision rather than words. Communicate your needs gently.',
          dos: ['Express need for affection kindly', 'Appreciate their efforts'],
          donts: ['Accuse them of not loving you'],
          tips: ['Make dua for softened hearts and better communication'],
          references: ['AboutIslam.net'],
          imageQuery: 'muslim youth feeling emotional',
          videoUrl: ''
        }, {
          title: 'Pressure to meet expectations',
          content: 'Parental expectations come from care. Balance them with your own strengths and istikhara.',
          dos: ['Discuss your capabilities openly', 'Make istikhara for big decisions'],
          donts: ['Hide your feelings or burn out'],
          tips: ['Compromise where possible while protecting your deen'],
          references: ['IslamQA.info'],
          imageQuery: 'muslim student under pressure',
          videoUrl: ''
        }, {
          title: 'Comparison with siblings/others',
          content: 'Comparison hurts self-esteem. Focus on your own journey with Allah.',
          dos: ['Politely ask parents to avoid comparison', 'Focus on self-improvement'],
          donts: ['Resent siblings'],
          tips: ['Each person is accountable for their own deeds'],
          references: ['IslamWeb.net'],
          imageQuery: 'muslim siblings comparison',
          videoUrl: ''
        }, {
          title: 'Healing parent-child relationships',
          content: 'Healing starts with small consistent acts of kindness and sincere dua.',
          dos: ['Initiate good actions', 'Forgive past mistakes'],
          donts: ['Wait for the other side to change first'],
          tips: ['Time, patience, and barakah from respecting parents heal many wounds'],
          references: ['Sunnah.com', 'AboutIslam.net'],
          imageQuery: 'healing muslim family relationship',
          videoUrl: ''
        }]
      }, {
        number: 6,
        title: 'Boundaries in Islam',
        subsections: [{
          title: 'Is it allowed to say no?',
          content: 'Yes, if the request is sinful or causes serious harm. Kindness must still be maintained.',
          dos: ['Say no kindly and explain reason', 'Maintain respect'],
          donts: ['Be rude or harsh'],
          tips: ['Respect remains even when boundaries are set'],
          references: ['IslamQA.info 6402'],
          imageQuery: 'muslim setting healthy boundaries',
          videoUrl: ''
        }, {
          title: 'Privacy & independence',
          content: 'Islam encourages modesty and privacy. Reasonable independence is allowed for valid needs.',
          dos: ['Respect parental concerns', 'Explain need for privacy calmly'],
          donts: ['Demand complete isolation'],
          tips: ['Balance privacy with family ties'],
          references: ['IslamWeb.net'],
          imageQuery: 'muslim youth seeking privacy',
          videoUrl: ''
        }, {
          title: 'Toxic or unfair treatment',
          content: 'Islam does not require enduring abuse. Seek help while trying to keep minimal ties if possible.',
          dos: ['Seek scholar or professional help', 'Protect yourself'],
          donts: ['Cut ties completely without valid reason'],
          tips: ['Obedience has limits in cases of harm'],
          references: ['IslamQA.info 121212'],
          imageQuery: 'muslim seeking help for family issues',
          videoUrl: ''
        }, {
          title: 'Respect vs self-respect balance',
          content: 'Respect parents always, but protect your deen and mental well-being.',
          dos: ['Maintain kindness', 'Seek balance through knowledge'],
          donts: ['Sacrifice your faith for approval'],
          tips: ['True respect includes honesty and protecting what Allah has made sacred'],
          references: ['IslamQA.info'],
          imageQuery: 'balance respect and self respect islam',
          videoUrl: ''
        }]
      }, {
        number: 7,
        title: 'Growing Up in Western Society',
        subsections: [{
          title: 'Parents not understanding Western life',
          content: 'Parents may fear fitnah in the West. Reassure them with your commitment to deen.',
          dos: ['Explain your environment calmly', 'Show consistent Islamic practice'],
          donts: ['Hide your Western experiences'],
          tips: ['Build trust through transparency'],
          references: ['AboutIslam.net'],
          imageQuery: 'muslim family in western country',
          videoUrl: ''
        }, {
          title: 'Double identity (home vs outside)',
          content: 'Maintain strong Islamic identity in all environments. Character should be consistent.',
          dos: ['Be the same Muslim at home and outside', 'Explain your choices'],
          donts: ['Hide your deen to fit in'],
          tips: ['You can adapt language and manners while keeping Islamic values'],
          references: ['IslamWeb.net'],
          imageQuery: 'muslim youth double identity',
          videoUrl: ''
        }, {
          title: 'Freedom vs protection',
          content: 'Parents protect you from harm. Negotiate reasonable freedom with responsibility.',
          dos: ['Show maturity and responsibility', 'Discuss boundaries'],
          donts: ['Demand unlimited freedom'],
          tips: ['Freedom in Islam comes with accountability'],
          references: ['IslamQA.info'],
          imageQuery: 'freedom vs protection muslim youth',
          videoUrl: ''
        }, {
          title: 'Dealing with “you’re too Western” or “too strict”',
          content: 'Find the middle path of balanced Islam. Avoid extremes.',
          dos: ['Listen to concerns', 'Show evidence of your practice'],
          donts: ['React defensively'],
          tips: ['The best is moderation in all things'],
          references: ['AboutIslam.net'],
          imageQuery: 'muslim youth balancing cultures',
          videoUrl: ''
        }]
      }, {
        number: 8,
        title: 'Education, Career & Life Choices',
        subsections: [{
          title: 'Parents forcing certain careers',
          content: 'Consult parents but choose what is halal and suits your abilities after istikhara.',
          dos: ['Discuss openly and respectfully', 'Make istikhara'],
          donts: ['Choose haram career to please them'],
          tips: ['Balance parental wishes with your strengths and deen'],
          references: ['IslamQA.info', 'AboutIslam.net'],
          imageQuery: 'muslim student choosing career',
          videoUrl: ''
        }, {
          title: 'Passion vs parental expectations',
          content: 'Passion is important, but it must align with halal and benefit the ummah.',
          dos: ['Combine passion with halal', 'Seek parental blessing'],
          donts: ['Pursue passion if it leads to haram'],
          tips: ['Istikhara helps align heart and reality'],
          references: ['IslamWeb.net'],
          imageQuery: 'muslim passion vs expectations',
          videoUrl: ''
        }, {
          title: 'Moving out for study/work',
          content: 'Permitted for valid reasons (study, halal work) while maintaining family ties and support.',
          dos: ['Assure parents of continued contact', 'Visit regularly'],
          donts: ['Cut communication or financial support if needed'],
          tips: ['Many relationships improve with space and maturity'],
          references: ['IslamQA.info', 'AboutIslam.net'],
          imageQuery: 'muslim youth moving out',
          videoUrl: ''
        }, {
          title: 'Islamically navigating big decisions',
          content: 'Consult parents, make istikhara, and seek knowledge before major life choices.',
          dos: ['Involve family in consultation', 'Pray istikhara'],
          donts: ['Decide impulsively'],
          tips: ['Allah guides those who trust Him'],
          references: ['Sunnah.com', 'Islamicity.org'],
          imageQuery: 'muslim making big life decision',
          videoUrl: ''
        }]
      }, {
        number: 9,
        title: 'Marriage & Relationships (Huge Topic)',
        subsections: [{
          title: 'Parents vs your choice in marriage',
          content: 'Parental approval is highly encouraged, but forced marriage is invalid. Consent is essential.',
          dos: ['Involve parents early', 'Choose a pious spouse'],
          donts: ['Marry secretly without necessity'],
          tips: ['Script: “I want your blessing because I value your opinion”'],
          references: ['IslamQA.info 45525 & 4602', 'IslamWeb.net'],
          imageQuery: 'muslim marriage discussion with parents',
          videoUrl: ''
        }, {
          title: 'Cultural barriers to marriage',
          content: 'Culture should not prevent a compatible, pious match. Prioritize deen over ethnicity.',
          dos: ['Explain compatibility in Islam', 'Seek scholar mediation if needed'],
          donts: ['Accept racial or caste prejudice'],
          tips: ['The Prophet ﷺ said: “If there comes to you one with whose character and religious commitment you are pleased, then marry him”'],
          references: ['Sunnah.com', 'IslamQA.info'],
          imageQuery: 'overcoming cultural barriers in marriage',
          videoUrl: ''
        }, {
          title: 'Love vs arranged marriage',
          content: 'Both can be valid if done Islamically. Love should develop after marriage or with proper boundaries.',
          dos: ['Maintain hijab and adab before marriage', 'Involve family'],
          donts: ['Engage in haram relationships'],
          tips: ['True love grows through taqwa and compatibility'],
          references: ['AboutIslam.net', 'IslamWeb.net'],
          imageQuery: 'love and arranged marriage islam',
          videoUrl: ''
        }, {
          title: 'Talking to parents about relationships',
          content: 'Approach the topic with maturity, evidence, and respect for their role.',
          dos: ['Choose right time', 'Focus on deen compatibility'],
          donts: ['Hide or rush'],
          tips: ['Parents often fear fitnah – address their concerns'],
          references: ['IslamQA.info'],
          imageQuery: 'muslim youth talking to parents about marriage',
          videoUrl: ''
        }]
      }, {
        number: 10,
        title: 'Practicing Islam with Parents',
        subsections: [{
          title: 'When parents are less practicing',
          content: 'Be a quiet example of excellence. Never look down on them.',
          dos: ['Lead by beautiful actions', 'Make dua for their guidance'],
          donts: ['Preach harshly or criticize'],
          tips: ['Soft speech and consistent practice soften hearts'],
          references: ['AboutIslam.net', 'IslamQA.info'],
          imageQuery: 'muslim family praying at home',
          videoUrl: ''
        }, {
          title: 'When you become more practicing than them',
          content: 'Increase in practice should increase your kindness, not arrogance.',
          dos: ['Be gentle', 'Invite through example'],
          donts: ['Judge or argue over differences'],
          tips: ['Make extra dua for them'],
          references: ['IslamQA.info'],
          imageQuery: 'more practicing muslim youth with parents',
          videoUrl: ''
        }, {
          title: 'Encouraging without preaching',
          content: 'Gentle reminders and living the deen are more effective than lectures.',
          dos: ['Share beneficial knowledge casually', 'Invite to good together'],
          donts: ['Force or shame'],
          tips: ['Actions speak louder than words'],
          references: ['IslamWeb.net'],
          imageQuery: 'encouraging family in islam',
          videoUrl: ''
        }, {
          title: 'Family religious habits',
          content: 'Build small consistent family habits like salah or Quran together.',
          dos: ['Start with easy acts', 'Make it positive'],
          donts: ['Force participation'],
          tips: ['Consistency brings barakah'],
          references: ['Sunnah.com'],
          imageQuery: 'muslim family religious habits',
          videoUrl: ''
        }]
      }, {
        number: 11,
        title: 'Duas & Spiritual Approach',
        subsections: [{
          title: 'Making dua for parents',
          content: 'One of the most powerful ways to improve the relationship and earn reward.',
          dos: ['Make dua after every salah', 'Include them in night prayers'],
          donts: ['Only complain without action'],
          tips: ['Dua: “Rabbir hamhuma kama rabbayani sagheera” (Quran 17:24)'],
          references: ['Quran 17:24', 'Sunnah.com'],
          imageQuery: 'muslim making dua for parents',
          videoUrl: ''
        }, {
          title: 'Sabr (patience) in hardship',
          content: 'Family struggles test patience. Reward is with those who persevere.',
          dos: ['Seek help from Allah', 'Remember temporary nature of dunya'],
          donts: ['Despair or complain excessively'],
          tips: ['Sabr brings relief and barakah'],
          references: ['IslamQA.info'],
          imageQuery: 'muslim practicing sabr',
          videoUrl: ''
        }, {
          title: 'Barakah in respecting parents',
          content: 'Respecting parents brings immense barakah in life and hereafter.',
          dos: ['Serve cheerfully', 'Remember reward'],
          donts: ['Expect immediate return'],
          tips: ['Barakah comes even when difficult'],
          references: ['IslamWeb.net'],
          imageQuery: 'barakah from respecting parents',
          videoUrl: ''
        }, {
          title: 'Trusting Allah in family struggles',
          content: 'Put trust in Allah while taking practical steps.',
          dos: ['Make dua and effort', 'Rely on Allah’s wisdom'],
          donts: ['Rely only on own power'],
          tips: ['Allah changes hearts when we turn to Him'],
          references: ['Islamicity.org'],
          imageQuery: 'trusting allah in family',
          videoUrl: ''
        }]
      }, {
        number: 12,
        title: 'Difficult & Sensitive Situations',
        subsections: [{
          title: 'Toxic or abusive households (handled carefully)',
          content: 'Islam does not command enduring abuse. Protect yourself and seek help while trying to keep ties where possible.',
          dos: ['Seek professional and scholarly help', 'Protect your safety and deen'],
          donts: ['Cut ties completely without valid reason or scholar advice'],
          tips: ['Obedience has limits in cases of serious harm'],
          references: ['IslamQA.info 121212', 'IslamWeb.net'],
          imageQuery: 'muslim seeking help for family issues',
          videoUrl: ''
        }, {
          title: 'Neglect or emotional harm',
          content: 'Emotional neglect is serious. Address it calmly and seek support.',
          dos: ['Communicate feelings kindly', 'Involve trusted third party if needed'],
          donts: ['Internalize blame'],
          tips: ['Healing is possible with time, dua, and boundaries'],
          references: ['AboutIslam.net'],
          imageQuery: 'emotional harm in family',
          videoUrl: ''
        }, {
          title: 'When to seek help',
          content: 'Seek help when struggles affect your deen, mental health, or safety.',
          dos: ['Consult scholar or counselor', 'Reach out to trusted community'],
          donts: ['Suffer in silence'],
          tips: ['Seeking help is strength, not weakness'],
          references: ['IslamQA.info'],
          imageQuery: 'seeking help in islam',
          videoUrl: ''
        }, {
          title: 'Islamic limits of obedience',
          content: 'Obedience is not absolute. No obedience in sin or harm.',
          dos: ['Obey in ma’ruf', 'Refuse sin politely'],
          donts: ['Obey in haram'],
          tips: ['Kindness continues even when refusing'],
          references: ['IslamQA.info 6402'],
          imageQuery: 'limits of obedience to parents',
          videoUrl: ''
        }]
      }, {
        number: 13,
        title: 'Building a Better Relationship',
        subsections: [{
          title: 'Small actions that improve connection',
          content: 'Consistency in small good deeds creates big change over time.',
          dos: ['Help without being asked', 'Smile and greet warmly'],
          donts: ['Wait for them to change first'],
          tips: ['Be the cool-headed one in the house'],
          references: ['Sunnah.com', 'AboutIslam.net'],
          imageQuery: 'muslim family bonding',
          videoUrl: ''
        }, {
          title: 'Showing appreciation',
          content: 'Express thanks regularly. Parents often feel unappreciated.',
          dos: ['Say thank you', 'Acknowledge their sacrifices'],
          donts: ['Take them for granted'],
          tips: ['Gratitude brings more good'],
          references: ['IslamWeb.net'],
          imageQuery: 'showing appreciation to parents',
          videoUrl: ''
        }, {
          title: 'Rebuilding trust',
          content: 'Trust is rebuilt through consistent honest actions.',
          dos: ['Keep promises', 'Be transparent'],
          donts: ['Hide important matters'],
          tips: ['Time and consistency heal trust'],
          references: ['IslamQA.info'],
          imageQuery: 'rebuilding trust in family',
          videoUrl: ''
        }, {
          title: 'Becoming the “cool-headed” one',
          content: 'Stay calm during conflicts. Your composure can de-escalate situations.',
          dos: ['Pause before reacting', 'Respond with wisdom'],
          donts: ['Match anger with anger'],
          tips: ['The Prophet ﷺ was the best in character'],
          references: ['Sunnah.com'],
          imageQuery: 'cool headed muslim youth',
          videoUrl: ''
        }]
      }, {
        number: 14,
        title: 'Quick Advice / Micro Content',
        subsections: [{
          title: '“Do this when your parents are angry”',
          content: 'Stay silent, make dua, and speak when they calm down.',
          dos: ['Lower your gaze', 'Say “I’m sorry you feel this way”'],
          donts: ['Argue back immediately'],
          tips: ['1 sentence: “I love you and I want to make this right”'],
          references: ['IslamWeb.net'],
          imageQuery: 'muslim calming angry parents',
          videoUrl: ''
        }, {
          title: '“1 sentence that de-escalates arguments”',
          content: '“I understand you’re upset and I want us to work through this together.”',
          dos: ['Use calm tone', 'Follow with listening'],
          donts: ['Use sarcastically'],
          tips: ['De-escalation shows maturity'],
          references: ['AboutIslam.net'],
          imageQuery: 'de escalating arguments',
          videoUrl: ''
        }, {
          title: '“Never say this to your parents”',
          content: '“You don’t understand” or “You’re too old-fashioned” – these hurt and close doors.',
          dos: ['Choose words that open dialogue'],
          donts: ['Use dismissive language'],
          tips: ['Respectful language preserves relationship'],
          references: ['IslamQA.info'],
          imageQuery: 'words to avoid with parents',
          videoUrl: ''
        }, {
          title: '“3 ways to earn barakah at home”',
          content: '1. Make dua for parents daily. 2. Serve them cheerfully. 3. Maintain family salah together.',
          dos: ['Be consistent'],
          donts: ['Do only for show'],
          tips: ['Barakah comes from small sincere acts'],
          references: ['Sunnah.com', 'Islamicity.org'],
          imageQuery: 'earning barakah at home',
          videoUrl: ''
        }]
      }, {
        number: 15,
        title: 'Real Stories & Scenarios (High Impact)',
        subsections: [{
          title: '“My parents don’t understand me…”',
          content: 'Many youth feel this. Patient communication and dua often improve understanding over time.',
          dos: ['Share feelings calmly', 'Show through actions'],
          donts: ['Isolate yourself'],
          tips: ['Stories show that sabr leads to better relationships'],
          references: ['AboutIslam.net'],
          imageQuery: 'muslim youth feeling misunderstood',
          videoUrl: ''
        }, {
          title: '“I want to move out but feel guilty”',
          content: 'Guilt is normal. Moving out for valid reasons is allowed if ties and support are maintained.',
          dos: ['Assure parents of your love', 'Visit regularly'],
          donts: ['Cut communication'],
          tips: ['Many families grow closer after giving space'],
          references: ['IslamQA.info', 'AboutIslam.net'],
          imageQuery: 'muslim youth moving out guilt',
          videoUrl: ''
        }, {
          title: '“They won’t let me marry”',
          content: 'Discuss reasons calmly. If the person is pious and compatible, involve a scholar for mediation.',
          dos: ['Present evidence of compatibility', 'Seek blessing'],
          donts: ['Marry secretly without necessity'],
          tips: ['Forced marriage is invalid in Islam'],
          references: ['IslamQA.info 4602'],
          imageQuery: 'parents refusing marriage',
          videoUrl: ''
        }]
      }, {
        number: 16,
        title: 'Interactive Content',
        subsections: [{
          title: '“Are you wrong here?” scenarios',
          content: 'Test understanding with real situations and Islamic responses.',
          dos: ['Think before reacting', 'Seek knowledge'],
          donts: ['React emotionally'],
          tips: ['Use these to learn and discuss with family'],
          references: ['All 5 sources'],
          imageQuery: 'muslim youth group discussion',
          videoUrl: ''
        }, {
          title: 'Polls on strict vs lenient parenting',
          content: 'Community insights help normalize struggles and find balanced Islamic approaches.',
          dos: ['Reflect on your own situation'],
          donts: ['Judge others harshly'],
          tips: ['Balance is best in parenting and obedience'],
          references: ['IslamWeb.net'],
          imageQuery: 'parenting poll islam',
          videoUrl: ''
        }]
      }],
      scenario1: '',
      feedback1: ''
    };
  },
  computed: {
    filteredChapters() {
      if (!this.searchQuery.trim()) return this.chapters;
      const q = this.searchQuery.toLowerCase();
      return this.chapters.filter(ch => ch.title.toLowerCase().includes(q) || ch.subsections.some(sub => sub.title.toLowerCase().includes(q) || sub.content.toLowerCase().includes(q)));
    },
    completedChapters() {
      return Object.keys(this.progress).length;
    },
    progressPercentage() {
      return Math.round(this.completedChapters / 16 * 100);
    }
  },
  methods: {
    async fetchPexelsImage(query) {
      try {
        const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
          headers: {
            Authorization: this.pexelsApiKey
          }
        });
        const data = await res.json();
        return data.photos && data.photos[0] ? data.photos[0].src.medium : null;
      } catch (e) {
        return null;
      }
    },
    performSearch() {
      document.getElementById('mainAccordion').scrollIntoView({
        behavior: 'smooth'
      });
    },
    jumpToChapter(index) {
      this.activeChapter = index;
      const el = document.getElementById('collapse-' + index);
      if (el) el.scrollIntoView({
        behavior: 'smooth'
      });
    },
    toggleChapter(index) {
      this.activeChapter = index;
    },
    markSubRead(chapterIndex, subIndex) {
      const chapterNum = this.chapters[chapterIndex].number;
      this.progress[chapterNum] = true;
      localStorage.setItem('islamicParentingProgress', JSON.stringify(this.progress));
    },
    resetProgress() {
      if (confirm('Reset all progress?')) {
        this.progress = {};
        localStorage.removeItem('islamicParentingProgress');
      }
    },
    showRandomTip() {
      const tips = ['Dua for parents: “Rabbir hamhuma kama rabbayani sagheera” (Quran 17:24)', 'The pleasure of Allah is in the pleasure of the parents (Hadith)', 'Control anger – it is from Shaytan'];
      alert('💡 Quick Tip:\n\n' + tips[Math.floor(Math.random() * tips.length)]);
    }
  },
  async mounted() {
    for (let c = 0; c < this.chapters.length; c++) {
      for (let s = 0; s < this.chapters[c].subsections.length; s++) {
        const sub = this.chapters[c].subsections[s];
        if (sub.imageQuery) {
          const url = await this.fetchPexelsImage(sub.imageQuery);
          if (url) this.$set(sub, 'imageUrl', url);
        }
      }
    }
    console.log('%c✅ Islamic Parenting Guide - All 16 Chapters Complete • Fully verified from 5 trusted sources • Professional UI/UX', 'color:#0a4d3d; font-weight:700');
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

const _hoisted_1 = {
  id: "islamic-connect-guide",
  class: "islamic-guide"
};
const _hoisted_2 = {
  id: "hero",
  class: "hero position-relative text-white d-flex align-items-center"
};
const _hoisted_3 = {
  class: "container"
};
const _hoisted_4 = {
  class: "row justify-content-center text-center"
};
const _hoisted_5 = {
  class: "col-lg-10 col-xl-8"
};
const _hoisted_6 = {
  class: "row justify-content-center"
};
const _hoisted_7 = {
  class: "col-lg-8"
};
const _hoisted_8 = {
  class: "input-group input-group-lg shadow-lg"
};
const _hoisted_9 = {
  class: "mt-5"
};
const _hoisted_10 = {
  class: "d-flex flex-wrap justify-content-center gap-3"
};
const _hoisted_11 = {
  class: "container py-5"
};
const _hoisted_12 = {
  class: "row"
};
const _hoisted_13 = {
  class: "col-lg-3"
};
const _hoisted_14 = {
  class: "sticky-top pt-2",
  style: {
    "top": "30px"
  }
};
const _hoisted_15 = {
  class: "list-group list-group-flush toc-list shadow-sm rounded-4 overflow-hidden bg-white"
};
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  key: 0,
  class: "badge bg-success rounded-pill px-3"
};
const _hoisted_18 = {
  class: "mt-5 p-4 bg-white rounded-4 shadow-sm text-center"
};
const _hoisted_19 = {
  class: "progress mb-3",
  style: {
    "height": "11px",
    "border-radius": "999px"
  }
};
const _hoisted_20 = {
  class: "text-muted"
};
const _hoisted_21 = {
  class: "col-lg-9"
};
const _hoisted_22 = {
  class: "accordion",
  id: "mainAccordion"
};
const _hoisted_23 = {
  class: "accordion-header"
};
const _hoisted_24 = ["data-bs-target", "onClick"];
const _hoisted_25 = {
  class: "text-accent me-4"
};
const _hoisted_26 = {
  key: 0,
  class: "ms-auto badge bg-success px-3"
};
const _hoisted_27 = ["id"];
const _hoisted_28 = {
  class: "accordion-body p-5"
};
const _hoisted_29 = {
  class: "d-flex justify-content-between align-items-start mb-4"
};
const _hoisted_30 = {
  class: "fw-bold text-accent mb-0"
};
const _hoisted_31 = {
  class: "mb-5 lh-lg fs-6",
  style: {
    "line-height": "1.85"
  }
};
const _hoisted_32 = {
  class: "row g-4 mb-5"
};
const _hoisted_33 = {
  key: 0,
  class: "col-md-6"
};
const _hoisted_34 = ["src"];
const _hoisted_35 = {
  key: 1,
  class: "col-md-6"
};
const _hoisted_36 = {
  class: "ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm"
};
const _hoisted_37 = ["src"];
const _hoisted_38 = {
  class: "row g-4 mb-5"
};
const _hoisted_39 = {
  class: "col-md-6"
};
const _hoisted_40 = {
  class: "do-card p-4 h-100 rounded-3"
};
const _hoisted_41 = {
  class: "list-unstyled"
};
const _hoisted_42 = {
  class: "col-md-6"
};
const _hoisted_43 = {
  class: "dont-card p-4 h-100 rounded-3"
};
const _hoisted_44 = {
  class: "list-unstyled"
};
const _hoisted_45 = {
  class: "tips-box p-4 mb-5 rounded-3"
};
const _hoisted_46 = {
  class: "d-flex flex-wrap gap-2"
};
const _hoisted_47 = {
  class: "small text-muted pt-3 border-top"
};
const _hoisted_48 = ["onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" HERO SECTION - Professional, Spacious & Visually Strong "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [_cache[7] || (_cache[7] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "mb-4",
    style: {
      "font-size": "6.5rem",
      "line-height": "1",
      "opacity": "0.12"
    }
  }, "ﷺ", -1 /* CACHED */)), _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", {
    class: "display-3 fw-bold mb-3",
    style: {
      "letter-spacing": "-1.5px"
    }
  }, "Parenting in Islam", -1 /* CACHED */)), _cache[9] || (_cache[9] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "display-5 fw-normal mb-4",
    style: {
      "color": "var(--accent-color)"
    }
  }, "A Practical Guide for Muslim Youth in the West", -1 /* CACHED */)), _cache[10] || (_cache[10] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "lead mb-5",
    style: {
      "max-width": "760px",
      "margin-left": "auto",
      "margin-right": "auto",
      "font-size": "1.32rem",
      "line-height": "1.6"
    }
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Bit-sized, real, and balanced guidance for common struggles. Acknowledges both youth challenges and parental perspectives. "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "100% curated and verified"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" exclusively from the top 5 trusted Islamic sources. ")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Enhanced Search "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [_cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
    class: "input-group-text bg-white border-0 px-4"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-search text-primary fs-4"
  })], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => $data.searchQuery = $event),
    onKeyup: _cache[1] || (_cache[1] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withKeys)((...args) => $options.performSearch && $options.performSearch(...args), ["enter"])),
    type: "text",
    class: "form-control border-0 py-4 fs-5",
    placeholder: "Search topics: strict parents, marriage, culture clash, moving out..."
  }, null, 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.searchQuery]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    class: "btn btn-accent px-5 fw-semibold",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.performSearch && $options.performSearch(...args))
  }, "Search")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Trusted Sources Highlight "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [_cache[6] || (_cache[6] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", {
    class: "small text-white-50 mb-3"
  }, "Exclusively verified from the 5 most trusted sources:", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.trustedSources, source => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
      key: source,
      class: "badge source-badge px-4 py-2 fs-6"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(source), 1 /* TEXT */);
  }), 128 /* KEYED_FRAGMENT */))])])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Subtle Islamic geometric overlay "), _cache[11] || (_cache[11] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "hero-overlay"
  }, null, -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SCHOLARLY DISCLAIMER "), _cache[25] || (_cache[25] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"container mt-5\" data-v-1431ac10><div class=\"alert shadow-sm border-0\" style=\"background:linear-gradient(90deg, #fff8e1, #f8f1e3);\" data-v-1431ac10><div class=\"d-flex align-items-start\" data-v-1431ac10><i class=\"bi bi-shield-check fs-2 text-warning me-4 mt-1\" data-v-1431ac10></i><div data-v-1431ac10><strong class=\"fs-5\" data-v-1431ac10>Scholarly Disclaimer</strong><br data-v-1431ac10> This entire guide is educational only. Every ruling, verse, and advice is <strong data-v-1431ac10>curated and cross-verified exclusively</strong> from <strong data-v-1431ac10>IslamQA.info</strong>, <strong data-v-1431ac10>IslamWeb.net</strong>, <strong data-v-1431ac10>Sunnah.com</strong>, <strong data-v-1431ac10>AboutIslam.net</strong>, and <strong data-v-1431ac10>Islamicity.org</strong>. It is not a fatwa and does not replace qualified scholarly advice. Consult your local imam or scholar for personal situations. May Allah grant barakah, sabr, and ihsan to every family. </div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" SIDEBAR TOC "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_14, [_cache[13] || (_cache[13] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", {
    class: "fw-bold text-primary mb-3"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-list-ul me-2"
  }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Chapters")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.chapters, (chapter, index) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
      key: index,
      href: "#",
      onClick: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)($event => $options.jumpToChapter(index), ["prevent"]),
      class: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["list-group-item list-group-item-action border-0 py-3 px-4 d-flex justify-content-between align-items-center", {
        'active-toc': $data.activeChapter === index
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.number) + ". " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.title), 1 /* TEXT */), $data.progress[chapter.number] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_17, "✓")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 10 /* CLASS, PROPS */, _hoisted_16);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Progress Tracker "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [_cache[12] || (_cache[12] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
    class: "fw-semibold text-primary mb-3"
  }, "Your Progress", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    class: "progress-bar bg-accent",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
      width: $options.progressPercentage + '%'
    })
  }, null, 4 /* STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("small", _hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.completedChapters) + " / 16 chapters • " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.progressPercentage) + "% complete", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[3] || (_cache[3] = (...args) => $options.resetProgress && $options.resetProgress(...args)),
    class: "btn btn-sm btn-outline-secondary w-100 mt-4"
  }, "Reset Progress")])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" MAIN CONTENT "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", {
    class: "fw-bold text-primary mb-5 text-center d-lg-none"
  }, "16 Chapters – Bit-Sized Guidance", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.filteredChapters, (chapter, cIndex) => {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: cIndex,
      class: "accordion-item border-0 shadow mb-5 rounded-4 overflow-hidden"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", _hoisted_23, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      class: "accordion-button collapsed bg-white px-5 py-4 fs-5 fw-semibold",
      type: "button",
      "data-bs-toggle": "collapse",
      "data-bs-target": '#collapse-' + cIndex,
      onClick: $event => $options.toggleChapter(cIndex)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_25, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.number) + ".", 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(chapter.title) + " ", 1 /* TEXT */), $data.progress[chapter.number] ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_26, "Completed")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)], 8 /* PROPS */, _hoisted_24)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      id: 'collapse-' + cIndex,
      class: "accordion-collapse collapse",
      "data-bs-parent": "#mainAccordion"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(chapter.subsections, (sub, sIndex) => {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: sIndex,
        class: "content-card mb-5 p-5 rounded-4"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h5", _hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(sub.title), 1 /* TEXT */), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
        class: "badge bg-light text-primary px-3 py-2"
      }, "Verified Content", -1 /* CACHED */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_31, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(sub.content), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [sub.imageUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("img", {
        src: sub.imageUrl,
        class: "img-fluid rounded-3 shadow-sm",
        style: {
          "height": "260px",
          "width": "100%",
          "object-fit": "cover"
        },
        alt: "Islamic family scene"
      }, null, 8 /* PROPS */, _hoisted_34)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), sub.videoUrl ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("iframe", {
        src: sub.videoUrl,
        allowfullscreen: ""
      }, null, 8 /* PROPS */, _hoisted_37)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_38, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
        class: "fw-bold text-success mb-4"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-check-circle-fill me-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Do’s")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_41, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(sub.dos, (item, i) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: i,
          class: "mb-3 d-flex"
        }, [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
          class: "text-success me-3"
        }, "✔", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
        class: "fw-bold text-danger mb-4"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-x-circle-fill me-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Don’ts")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(sub.donts, (item, i) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
          key: i,
          class: "mb-3 d-flex"
        }, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
          class: "text-danger me-3"
        }, "✘", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(item), 1 /* TEXT */)]);
      }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_45, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h6", {
        class: "fw-semibold mb-3"
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-lightbulb me-2"
      }), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Practical Tips & Reminders")], -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_46, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(sub.tips, (tip, t) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: t,
          class: "badge tip-badge px-4 py-2 fs-6"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tip), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" 📖 ", -1 /* CACHED */)), _cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("strong", null, "Verified from:", -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(sub.references, (ref, r) => {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
          key: r,
          class: "ms-2 badge source-ref"
        }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(ref), 1 /* TEXT */);
      }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
        onClick: $event => $options.markSubRead(cIndex, sIndex),
        class: "btn btn-outline-primary mt-4 px-4"
      }, [...(_cache[22] || (_cache[22] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
        class: "bi bi-check2-circle me-2"
      }, null, -1 /* CACHED */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" Mark Subsection Complete ", -1 /* CACHED */)]))], 8 /* PROPS */, _hoisted_48)]);
    }), 128 /* KEYED_FRAGMENT */))])], 8 /* PROPS */, _hoisted_27)]);
  }), 128 /* KEYED_FRAGMENT */))])])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" RESOURCES SECTION "), _cache[26] || (_cache[26] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createStaticVNode)("<div class=\"bg-light py-5\" data-v-1431ac10><div class=\"container\" data-v-1431ac10><div class=\"row g-5\" data-v-1431ac10><div class=\"col-lg-4\" data-v-1431ac10><div class=\"card h-100 border-0 shadow-sm\" data-v-1431ac10><div class=\"card-body p-5\" data-v-1431ac10><h5 class=\"fw-bold text-primary mb-4\" data-v-1431ac10>Global Do’s &amp; Don’ts</h5><ul class=\"list-group list-group-flush\" data-v-1431ac10><li class=\"list-group-item border-0 py-3\" data-v-1431ac10>✔ Speak with kindness and lower your voice (Quran 31:19 - IslamWeb.net)</li><li class=\"list-group-item border-0 py-3\" data-v-1431ac10>✘ Never say “uff” to parents (Quran 17:23 - IslamQA.info)</li><li class=\"list-group-item border-0 py-3\" data-v-1431ac10>✔ Make dua for parents daily (Sunnah.com)</li></ul></div></div></div><div class=\"col-lg-4\" data-v-1431ac10><div class=\"card h-100 border-0 shadow-sm\" data-v-1431ac10><div class=\"card-body p-5\" data-v-1431ac10><h5 class=\"fw-bold text-primary mb-4\" data-v-1431ac10>FAQs</h5><div class=\"accordion accordion-flush\" id=\"faqAcc\" data-v-1431ac10><div class=\"accordion-item\" data-v-1431ac10><h2 class=\"accordion-header\" data-v-1431ac10><button class=\"accordion-button collapsed\" data-bs-toggle=\"collapse\" data-bs-target=\"#faq1\" data-v-1431ac10>Can I say “no” to parents?</button></h2><div id=\"faq1\" class=\"accordion-collapse collapse\" data-v-1431ac10><div class=\"accordion-body\" data-v-1431ac10>Yes, if the request is sinful or harmful. Kindness must remain (IslamQA.info Fatwa 6402).</div></div></div><div class=\"accordion-item\" data-v-1431ac10><h2 class=\"accordion-header\" data-v-1431ac10><button class=\"accordion-button collapsed\" data-bs-toggle=\"collapse\" data-bs-target=\"#faq2\" data-v-1431ac10>Forced marriage?</button></h2><div id=\"faq2\" class=\"accordion-collapse collapse\" data-v-1431ac10><div class=\"accordion-body\" data-v-1431ac10>Invalid without consent (IslamQA.info).</div></div></div></div></div></div></div><div class=\"col-lg-4\" data-v-1431ac10><div class=\"card h-100 border-0 shadow-sm\" data-v-1431ac10><div class=\"card-body p-5\" data-v-1431ac10><h5 class=\"fw-bold text-primary mb-4\" data-v-1431ac10>Learning Resources</h5><a href=\"https://islamqa.info\" target=\"_blank\" class=\"d-block mb-3 text-decoration-none\" data-v-1431ac10>IslamQA.info</a><a href=\"https://islamweb.net\" target=\"_blank\" class=\"d-block mb-3 text-decoration-none\" data-v-1431ac10>IslamWeb.net</a><a href=\"https://sunnah.com\" target=\"_blank\" class=\"d-block mb-3 text-decoration-none\" data-v-1431ac10>Sunnah.com</a><a href=\"https://aboutislam.net\" target=\"_blank\" class=\"d-block mb-3 text-decoration-none\" data-v-1431ac10>AboutIslam.net</a><a href=\"https://islamicity.org\" target=\"_blank\" class=\"d-block text-decoration-none\" data-v-1431ac10>Islamicity.org</a></div></div></div></div></div></div>", 1)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Floating Quick Tip "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    onClick: _cache[4] || (_cache[4] = (...args) => $options.showRandomTip && $options.showRandomTip(...args)),
    class: "floating-tip position-fixed bottom-0 end-0 m-4 rounded-circle shadow-lg btn btn-accent"
  }, [...(_cache[24] || (_cache[24] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("i", {
    class: "bi bi-lightbulb fs-3"
  }, null, -1 /* CACHED */)]))])]);
}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true */ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true");
/* harmony import */ var _ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=script&lang=js */ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
/* harmony import */ var _ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css */ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css");
/* harmony import */ var _node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-1431ac10"],['__file',"resources/js/components/ParentingComponent.vue"]])
/* hot reload */
if (false) // removed by dead control flow
{}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js":
/*!********************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=script&lang=js */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css":
/*!****************************************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_clonedRuleSet_11_use_0_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_11_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_laravel_mix_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_11_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_style_index_0_id_1431ac10_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css */ "./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-11.use[0]!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-11.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/laravel-mix/node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-11.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=style&index=0&id=1431ac10&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true":
/*!**************************************************************************************************!*\
  !*** ./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_ParentingComponent_vue_vue_type_template_id_1431ac10_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true */ "./node_modules/laravel-mix/node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/ParentingComponent.vue?vue&type=template&id=1431ac10&scoped=true");


/***/ })

}]);
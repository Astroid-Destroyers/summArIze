<!-- insert image from summarize.png -->
![summarize database](summarize.png)

This database is designed for a study-support system where users upload notes, documents, or video links and receive AI-generated learning materials. 
StudyMaterial is the core entity because summaries, notes, quizzes, flashcards, and other outputs all come from the uploaded content. 
GeneratedContent stores flexible AI results such as summaries, auto notes, feedback, or gamified notes without duplicating the original material.

The design also supports learning activities and progress tracking. 
Quiz, QuizQuestion, QuizAttempt, and AttemptAnswer handle quiz generation and scoring, while FlashcardSet and Flashcard support review tools. 
StudyPlan and PlanMaterial allow many materials to be scheduled inside one plan. 
Search can run across StudyMaterial and GeneratedContent, and progress can be measured from quiz attempts and plan completion.

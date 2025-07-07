export const projects = [
  {
    id: 1,
    title: "Smart City Analytics Competition",
    category: "Machine Learning",
    description: "Energy consumption prediction for Seattle buildings to optimize city policies.",
    longDescription: "Developed an advanced regression model to predict energy consumption and CO2 emissions for commercial buildings. Used feature engineering techniques and hyperparameter optimization.",
    technologies: ["Python", "Scikit-learn", "XGBoost", "Pandas", "Feature Engineering"],
    image: "/images/smart-city.jpg",
    github: "https://github.com/DerrazSofiane/green-city-analytics",
    demo: null,
    detailsPath: "/project details/OC-01-Smart-City-Competition.md",
    results: [
      "R² score of 0.92 on energy prediction",
      "15% error reduction compared to baseline",
      "Top 10% in competition ranking"
    ],
    featured: true
  },
  {
    id: 2,
    title: "Bad Buzz Detection with Deep Learning",
    category: "Deep Learning",
    description: "Sentiment analysis on tweets to automatically detect bad buzz and protect e-reputation.",
    longDescription: "Created a deep learning model for sentiment classification on tweets. Implemented LSTM and BERT to understand context and language nuances.",
    technologies: ["Python", "TensorFlow", "BERT", "LSTM", "NLP", "Keras"],
    image: "/images/bad-buzz.jpg",
    github: "https://github.com/DerrazSofiane/mlops-badbuzz-detector",
    demo: null,
    detailsPath: "/project details/OC-02-Bad-Buzz-Detection.md",
    results: [
      "94% accuracy on negative sentiment detection",
      "F1-score of 0.91 on bad buzz cases",
      "Processing time < 100ms per tweet"
    ],
    featured: true
  },
  {
    id: 3,
    title: "Autonomous Vehicle Development",
    category: "Computer Vision",
    description: "Image segmentation to identify road elements (vehicles, pedestrians, signs) in real-time.",
    longDescription: "Developed a computer vision system for autonomous vehicles using convolutional neural networks for semantic segmentation of urban driving images.",
    technologies: ["Python", "PyTorch", "OpenCV", "U-Net", "YOLO", "Computer Vision"],
    image: "/images/autonomous-car.jpg",
    github: "https://github.com/DerrazSofiane/car-vision-segmentation-model",
    demo: null,
    detailsPath: "/project details/OC-03-Car-Vision-Segmentation.md",
    results: [
      "mIoU of 0.87 on Cityscapes dataset",
      "30 FPS on GPU for real-time processing",
      "Detection of 8 different object classes"
    ],
    featured: true
  },
  {
    id: 4,
    title: "E-commerce Customer Segmentation",
    category: "Machine Learning",
    description: "Unsupervised customer segmentation to optimize marketing strategies and improve retention.",
    longDescription: "Applied clustering techniques to identify distinct customer segments based on purchasing behavior, enabling personalized marketing campaigns.",
    technologies: ["Python", "K-Means", "DBSCAN", "RFM Analysis", "Plotly", "Pandas"],
    image: "/images/customer-segmentation.jpg",
    github: "https://github.com/DerrazSofiane/olist-client-segmentation",
    demo: null,
    detailsPath: "/project details/OC-05-Customer-Segmentation.md",
    results: [
      "Identified 5 distinct customer segments",
      "23% increase in conversion rate",
      "35% improvement in marketing ROI"
    ],
    featured: false
  },
  {
    id: 5,
    title: "Healthcare Data Preparation",
    category: "Data Engineering",
    description: "Medical data processing pipeline to facilitate epidemiological analysis.",
    longDescription: "Created a robust ETL pipeline to clean, transform and enrich public health data while complying with GDPR and medical confidentiality standards.",
    technologies: ["Python", "Apache Spark", "SQL", "Airflow", "Docker", "RGPD"],
    image: "/images/health-data.jpg",
    github: "https://github.com/DerrazSofiane/sante-publique-analytics",
    demo: null,
    detailsPath: "/project details/OC-04-Healthcare-Data-Preparation.md",
    results: [
      "Processed 10M+ patient records",
      "90% reduction in data preparation time",
      "100% GDPR compliance"
    ],
    featured: false
  },
  {
    id: 6,
    title: "Content Recommendation System",
    category: "Machine Learning",
    description: "Hybrid recommendation system combining collaborative filtering and content-based approaches.",
    longDescription: "Developed a recommendation engine using matrix factorization techniques and deep learning to personalize content suggestions.",
    technologies: ["Python", "TensorFlow", "Matrix Factorization", "Flask", "Redis", "API REST"],
    image: "/images/recommendation-system.jpg",
    github: "https://github.com/DerrazSofiane/yelp-reviews-analysis",
    demo: null,
    detailsPath: "/project details/OC-06-Deep-Learning-Sentiment-Analysis.md",
    results: [
      "Precision@10 of 0.85",
      "40% increase in platform engagement time",
      "API handling 1000 requests/sec"
    ],
    featured: false
  },
  {
    id: 7,
    title: "Credit Scoring Model",
    category: "Machine Learning",
    description: "Credit scoring model to evaluate client default probability.",
    longDescription: "Created an interpretable credit scoring model using ensemble learning techniques and explainability (SHAP) for transparent decision-making.",
    technologies: ["Python", "LightGBM", "SHAP", "Streamlit", "FastAPI", "MLflow"],
    image: "/images/credit-scoring.jpg",
    github: "https://github.com/DerrazSofiane/scoring_banking_credit",
    demo: "https://credit-scoring-demo.streamlit.app",
    detailsPath: "/project details/OC-07-Credit-Scoring-Model.md",
    results: [
      "AUC-ROC of 0.94",
      "25% reduction in payment defaults",
      "Interactive dashboard for credit analysts"
    ],
    featured: true
  },
  {
    id: 8,
    title: "AI Chatbot Enhancement",
    category: "Deep Learning",
    description: "AI chatbot optimization with advanced NLP techniques and LLM fine-tuning.",
    longDescription: "Enhanced a conversational assistant by implementing RAG (Retrieval-Augmented Generation) techniques and fine-tuning language models.",
    technologies: ["Python", "Transformers", "LangChain", "Vector DB", "GPT", "Fine-tuning"],
    image: "/images/ai-chatbot.jpg",
    github: "https://github.com/DerrazSofiane/flyme-chatbot-model-mvp",
    demo: null,
    detailsPath: "/project details/OC-10-AI-Chatbot-Azure.md",
    results: [
      "45% improvement in user satisfaction",
      "60% reduction in support escalations",
      "Average response time < 2 seconds"
    ],
    featured: false
  },
  {
    id: 9,
    title: "MLOps Proof of Concept",
    category: "MLOps",
    description: "Complete MLOps solution POC with automated deployment and production monitoring.",
    longDescription: "Implemented a complete MLOps infrastructure including CI/CD, monitoring, A/B testing and automatic model retraining.",
    technologies: ["Python", "Kubernetes", "MLflow", "Prometheus", "GitHub Actions", "Azure ML"],
    image: "/images/mlops-poc.jpg",
    github: "https://github.com/DerrazSofiane/content-recommendation-model",
    demo: null,
    detailsPath: "/project details/OC-09-MLOps-Content-Recommendation.md",
    results: [
      "Automated deployment in < 10 minutes",
      "Drift detection with automatic alerting",
      "Scalable infrastructure up to 10k req/min"
    ],
    featured: false
  },
  {
    id: 10,
    title: "AI Project Scoping Framework",
    category: "Project Management",
    description: "Scoping framework and methodology for AI projects including risk assessment and ROI.",
    longDescription: "Developed a complete methodology for AI project scoping, including feasibility analysis, resource estimation and ethical risk management.",
    technologies: ["Project Management", "Risk Analysis", "Agile", "Data Strategy", "Ethics AI"],
    image: "/images/ai-project-framework.jpg",
    github: "https://github.com/DerrazSofiane/ai-project-scoping",
    demo: null,
    detailsPath: "/project details/OC-08-AI-Project-Scoping.md",
    results: [
      "Framework adopted by 3 companies",
      "40% reduction in project failures",
      "Standardized documentation template"
    ],
    featured: false
  }
];

export const technologies = [
  "Tous",
  "Python",
  "Machine Learning", 
  "Deep Learning",
  "Computer Vision",
  "NLP",
  "MLOps",
  "Data Engineering"
];

export const categories = [
  "All",
  "Machine Learning",
  "Deep Learning", 
  "Computer Vision",
  "Data Engineering",
  "MLOps",
  "Project Management"
];
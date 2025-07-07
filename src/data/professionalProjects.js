// Company logo mapping
const companyLogos = {
  'Digifab': '/images/companies/digifab.png',
  'FranceVérif': '/images/companies/franceverif.png',
  'W\'ANT': '/images/companies/w-ant.png',
  'Paris je t\'aime': '/images/companies/paris-je-t-aime.svg',
  'Paris je t\'aime (OTCP)': '/images/companies/paris-je-t-aime.svg',
  'ADN Data': '/images/companies/adn-data.png',
  'Headn': '/images/companies/headn.jpg',
  'ISOPROM': '/images/companies/isoprom.png',
  'Confidential': null, // No logo for confidential clients
};

export const professionalProjects = [
  {
    id: 'digifab-genai',
    title: 'Multi-Modal LLM Content Generation Platform',
    client: 'Digifab',
    period: 'Jan 2024 - Present',
    description: 'Architected a unified GenAI platform orchestrating multiple LLMs to generate diverse educational content types - courses, quizzes, exercises, and assessments - with 160% performance improvement.',
    thumbnail: '/images/projects/digifab-genai-thumb.png',
    companyLogo: companyLogos['Digifab'],
    longDescription: `Digifab, a digital learning and content creation company, was struggling with an inefficient content processing pipeline that was severely limiting their ability to scale. Their existing system took hours to generate diverse educational content across multiple formats (text, images, and videos). The manual processes involved in creating different content types, managing multiple LLM providers for various tasks, and ensuring pedagogical quality across all outputs created significant bottlenecks.

I designed a unified content generation architecture using Python that could orchestrate multiple LLM providers for different educational content types. The pipeline was built with specialized generators for courses, quizzes, exercises, and assessments, each leveraging the most suitable LLM for that task. Docker containerization ensured consistency while allowing different services to scale independently based on content demand.

The system uses hierarchical generation where course outlines are generated first, then individual modules, followed by associated quizzes and exercises. This ensures pedagogical coherence across all content types. The architecture emphasized intelligent routing between different LLM providers based on content requirements, cost, and availability, with seamless fallback mechanisms to ensure continuous generation capabilities.`,
    technologies: [
      'Python',
      'Docker',
      'Kubernetes',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'LangChain',
      'OpenAI API',
      'Claude API',
      'Gemini API',
      'PyTorch',
      'Celery',
      'Apache Airflow'
    ],
    results: [
      'Reduced complete course generation time by 160% (from 4 hours to 1.5 hours)',
      'Generated 500+ complete courses with quizzes and exercises in first quarter',
      'Achieved 95% pedagogical quality score on generated content',
      'Reduced content generation costs by 30% through intelligent LLM routing',
      'Created 10,000+ unique quiz questions and 5,000+ exercises monthly'
    ],
    features: [
      'Multi-LLM orchestration for specialized content generation',
      'Hierarchical content generation ensuring pedagogical coherence',
      'Intelligent caching with cross-type content adaptation',
      'Real-time quality validation using educational standards',
      'Unified pipeline generating courses, quizzes, exercises, and assessments',
      'Adaptive learning paths based on student performance'
    ],
    challenges: 'Ensuring pedagogical coherence across different content types while orchestrating multiple LLMs with varying capabilities and costs.',
    category: 'mlops',
    featured: true,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Structure drives quality: Generating course outlines first and deriving other content ensures coherence',
        'Specialization matters: Different LLMs excel at different content types - routing is crucial',
        'Adaptation beats regeneration: Modifying existing content for new purposes is faster and often better'
      ],
      wouldDoDifferently: [
        'Implement the unified content planning system from the start rather than generating different content types independently',
        'Build quality validation into the generation process rather than as a post-processing step',
        'Implement learner feedback loops to optimize content generation based on actual usage data'
      ]
    },
    futureImprovements: [
      'Personalized content generation: Adapt content difficulty and style to individual learner profiles',
      'Interactive content types: Expand to simulations, coding environments, and virtual labs',
      'Real-time adaptation: Modify content based on learner performance during lessons',
      'Collaborative generation: Enable instructors to guide and refine AI generation in real-time',
      'Multi-language support: Generate localized versions maintaining pedagogical quality'
    ],
    metrics: [
      {
        label: 'Course Generation Time',
        value: '1.5 hours',
        baseline: '4 hours',
        change: -62.5,
        impact: 'Instructors create full courses in hours instead of weeks'
      },
      {
        label: 'Content Generation Cost',
        value: '€21,000/month',
        baseline: '€30,000/month',
        change: -30,
        impact: '€300,000 annual savings on content creation'
      },
      {
        label: 'Content Variety',
        value: '5x',
        baseline: '1x',
        change: 400,
        impact: '5x increase in available exercises per topic'
      },
      {
        label: 'Pedagogical Quality Score',
        value: '95%',
        baseline: '75%',
        change: 27,
        impact: 'Consistently high-quality educational content'
      },
      {
        label: 'Learner Completion Rate',
        value: '68%',
        baseline: '48%',
        change: 42,
        impact: '40% improvement in course completion rates'
      }
    ],
    codeExamples: [
      {
        title: 'Multi-Content Generation Orchestration',
        language: 'Python',
        description: 'Unified pipeline generating courses, quizzes, exercises with 160% improvement',
        code: `class EducationalContentPipeline:
    """
    Unified pipeline generating courses, quizzes, exercises with 160% improvement
    """
    def __init__(self, config):
        self.llm_router = LLMRouter(config['providers'])
        self.content_generators = {
            'course': CourseGenerator(),
            'quiz': QuizGenerator(),
            'exercise': ExerciseGenerator(),
            'assessment': AssessmentGenerator()
        }
        self.quality_validator = PedagogicalValidator()
        self.unified_cache = ContentCacheManager()
        
    async def generate_complete_course(self, course_request):
        """
        Generate comprehensive educational content package
        """
        # Phase 1: Generate course structure
        course_outline = await self._generate_course_outline(course_request)
        
        # Phase 2: Generate content for each module in parallel
        module_tasks = []
        for module in course_outline['modules']:
            module_task = asyncio.create_task(
                self._generate_module_content(module, course_request)
            )
            module_tasks.append(module_task)
        
        # Wait for all modules to complete
        completed_modules = await asyncio.gather(*module_tasks)
        
        # Phase 3: Validate and assemble complete course
        validated_course = await self.quality_validator.validate_course(
            outline=course_outline,
            modules=completed_modules
        )
        
        return {
            'course': validated_course,
            'modules': completed_modules,
            'generation_stats': self._calculate_generation_stats()
        }
    
    async def _generate_module_content(self, module, course_context):
        """
        Generate all content types for a single module
        """
        # Generate different content types in parallel
        content_tasks = {
            'explanation': self._generate_explanation(module, course_context),
            'examples': self._generate_examples(module, course_context),
            'quiz': self._generate_quiz(module, course_context),
            'exercises': self._generate_exercises(module, course_context),
            'visual_aids': self._generate_visual_content(module, course_context)
        }
        
        # Execute all generation tasks
        results = {}
        for content_type, task in content_tasks.items():
            try:
                results[content_type] = await task
            except Exception as e:
                # Fallback generation if primary fails
                results[content_type] = await self._fallback_generation(
                    content_type, module, e
                )
        
        # Ensure pedagogical alignment across content types
        aligned_content = await self._align_module_content(results)
        
        return aligned_content`,
        explanation: 'This architecture ensures pedagogical coherence by generating course outlines first, then creating all content types in parallel while maintaining alignment with learning objectives.'
      },
      {
        title: 'Multi-LLM Routing and Optimization',
        language: 'Python',
        description: 'Intelligent routing between multiple LLM providers based on task requirements',
        code: `class LLMRouter:
    """
    Intelligent routing between multiple LLM providers based on task requirements
    """
    def __init__(self, provider_configs):
        self.providers = self._initialize_providers(provider_configs)
        self.capability_matrix = self._build_capability_matrix()
        self.cost_tracker = CostTracker()
        self.performance_monitor = PerformanceMonitor()
        
    def select_for_task(self, task_type, requirements=None):
        """
        Select optimal LLM provider for specific task
        """
        # Get capable providers for task
        capable_providers = self.capability_matrix[task_type]
        
        # Score each provider
        scores = {}
        for provider in capable_providers:
            score = self._calculate_provider_score(
                provider,
                task_type,
                requirements
            )
            scores[provider] = score
        
        # Select best provider considering multiple factors
        best_provider = max(scores.items(), key=lambda x: x[1]['total_score'])
        
        return self.providers[best_provider[0]]
    
    def _calculate_provider_score(self, provider, task_type, requirements):
        """
        Multi-factor scoring for provider selection
        """
        scores = {
            'quality': self._get_quality_score(provider, task_type),
            'cost': self._get_cost_score(provider, task_type),
            'latency': self._get_latency_score(provider),
            'availability': self._get_availability_score(provider),
            'specialization': self._get_specialization_score(provider, task_type)
        }
        
        # Weight factors based on task requirements
        weights = self._get_task_weights(task_type, requirements)
        
        total_score = sum(
            scores[factor] * weights[factor] 
            for factor in scores
        )
        
        return {
            'total_score': total_score,
            'breakdown': scores,
            'estimated_cost': self._estimate_task_cost(provider, task_type)
        }`,
        explanation: 'This routing system selects the best LLM for each content type based on quality, cost, latency, and specialization, reducing costs by 30% while maintaining quality.'
      }
    ],
    testimonials: [
      {
        quote: "The platform revolutionized our content creation. We can now generate complete courses with quizzes, exercises, and assessments in hours. The quality is consistently high, and the variety keeps learners engaged.",
        author: "Head of Learning",
        role: "Educational Content Director",
        company: "Digifab"
      }
    ]
  },

  {
    id: 'paris-competitive-benchmark',
    title: 'Competitive Benchmark Intelligence Platform',
    client: 'Paris je t\'aime (OTCP)',
    period: '2021 - 2024',
    description: 'Built a real-time competitive intelligence system analyzing ticket reseller pricing and strategies, enabling data-driven pricing decisions that increased revenue by 12%.',
    thumbnail: '/images/projects/paris-competitive-benchmark-thumb.png',
    companyLogo: companyLogos['Paris je t\'aime (OTCP)'],
    longDescription: `The Office du Tourisme et des Congrès de Paris (OTCP) was operating in a highly competitive online tourism marketplace where numerous ticket resellers and experience platforms were vying for the same customers. Major players like GetYourGuide, Viator, Tiqets, and Musement were aggressively competing on pricing, user experience, and service offerings. OTCP lacked systematic visibility into competitor strategies, pricing models, and promotional tactics.

I designed a distributed data collection and analysis platform using Python as the core technology stack. The architecture consisted of a data collection layer using requests with session management and header rotation for reliable scraping, an analysis engine leveraging pandas, NumPy, and scikit-learn for statistical analysis, and a presentation layer built with Streamlit for real-time interactive dashboards.

The system monitors 8 major ticket reseller platforms with updates every 15 minutes, tracking 200+ tourist attractions across Paris. It analyzes 50,000+ price points daily and detects 95% of competitor promotions within 2 hours of launch, dramatically reducing price analysis time from 3 days to 30 minutes.`,
    technologies: [
      'Python',
      'Streamlit',
      'BeautifulSoup',
      'Requests',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'Redis',
      'PostgreSQL',
      'Plotly',
      'Docker',
      'AWS EC2'
    ],
    results: [
      'Monitored 8 major ticket reseller platforms with 15-minute updates',
      'Tracked 200+ tourist attractions across Paris',
      'Analyzed 50,000+ price points daily',
      'Detected 95% of competitor promotions within 2 hours',
      'Reduced price analysis time from 3 days to 30 minutes',
      'Increased revenue by 12% through optimized pricing strategies'
    ],
    features: [
      'Real-time price monitoring across multiple platforms',
      'Intelligent promotion detection with pattern recognition',
      'Dynamic pricing recommendations based on market conditions',
      'Streamlit dashboard with live pricing comparisons',
      'Statistical analysis for market positioning insights',
      'Automated alerts for significant price changes',
      'Multi-currency normalization and comparison',
      'Historical trend analysis and forecasting'
    ],
    challenges: 'Handling dynamic websites with JavaScript-rendered content and various anti-bot protections while maintaining real-time data accuracy.',
    category: 'data-viz',
    featured: true,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Speed matters more than perfection: In dynamic pricing, being 90% accurate but fast beats being 99% accurate but slow',
        'Promotions follow patterns: Most competitors had predictable promotional calendars that could be anticipated',
        'Context is crucial: Raw price comparisons without considering factors like refund policies and included services led to poor decisions'
      ],
      wouldDoDifferently: [
        'Implement machine learning models for price prediction earlier',
        'Establish data partnerships with price comparison websites to supplement scraping efforts',
        'Build automated price adjustment APIs for even faster response times to market changes'
      ]
    },
    futureImprovements: [
      'Predictive pricing models: Use historical data to predict competitor price changes before they happen',
      'Automated price optimization: Implement real-time price adjustments based on market conditions',
      'Customer perception analysis: Include review sentiment about pricing in the competitive analysis',
      'API marketplace: Create a data product selling competitive insights to smaller tourism operators'
    ],
    metrics: [
      {
        label: 'Revenue Growth',
        value: '12%',
        baseline: '0%',
        change: 12,
        impact: 'Optimized pricing strategies captured more market share'
      },
      {
        label: 'Analysis Time',
        value: '30 minutes',
        baseline: '3 days',
        change: -99,
        impact: 'Same-day pricing decisions instead of weekly reviews'
      },
      {
        label: 'Promotion Detection',
        value: '95%',
        baseline: '20%',
        change: 375,
        impact: 'Rapid response to competitor promotions'
      },
      {
        label: 'Platform Coverage',
        value: '8 platforms',
        baseline: '2 platforms',
        change: 300,
        impact: 'Comprehensive market visibility'
      },
      {
        label: 'Lost Sales Prevention',
        value: '€200,000',
        baseline: '€0',
        change: 100,
        impact: 'Prevented losses from uncompetitive pricing'
      }
    ],
    codeExamples: [
      {
        title: 'Real-Time Price Collection System',
        language: 'Python',
        description: 'Intelligent scraping system with anti-detection and normalization',
        code: `class TicketResellerBenchmark:
    """
    Real-time competitive intelligence system for ticket reseller market
    with advanced price tracking and promotion detection
    """
    def __init__(self, config):
        self.competitors = {
            'getyourguide': {'base_url': 'https://...', 'parser': 'gyg_parser'},
            'viator': {'base_url': 'https://...', 'parser': 'viator_parser'},
            'tiqets': {'base_url': 'https://...', 'parser': 'tiqets_parser'},
            'musement': {'base_url': 'https://...', 'parser': 'musement_parser'}
        }
        self.session = self._create_session()
        self.currency_converter = CurrencyConverter()
        self.price_cache = {}
    
    def collect_competitor_prices(self, attraction_id, competitor):
        """Collect real-time pricing data from competitor platforms"""
        
        competitor_config = self.competitors[competitor]
        parser = getattr(self, competitor_config['parser'])
        
        try:
            # Build URL for specific attraction
            url = self._build_competitor_url(attraction_id, competitor)
            
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            # Parse pricing data
            soup = BeautifulSoup(response.content, 'html.parser')
            price_data = parser(soup)
            
            # Normalize to EUR for comparison
            normalized_prices = {
                'base_price': self.currency_converter.convert(
                    price_data['price'], 
                    price_data['currency'], 
                    'EUR'
                ),
                'original_price': price_data.get('original_price'),
                'discount_percentage': self._calculate_discount(price_data),
                'availability': price_data.get('availability', 'unknown'),
                'booking_fee': price_data.get('booking_fee', 0),
                'total_price': self._calculate_total_price(price_data),
                'promotion_text': price_data.get('promotion_text'),
                'last_updated': datetime.now()
            }
            
            # Update cache
            self.price_cache[f"{competitor}_{attraction_id}"] = normalized_prices
            
            return normalized_prices`,
        explanation: 'This system collects pricing data from multiple competitor platforms, normalizes currencies, and detects promotions in real-time, enabling rapid pricing decisions.'
      },
      {
        title: 'Market Positioning Analytics',
        language: 'Python',
        description: 'Statistical analysis for competitive pricing insights',
        code: `class CompetitivePricingAnalyzer:
    """
    Deep statistical analysis of competitor pricing strategies
    with real-time market positioning insights
    """
    def __init__(self):
        self.price_history = defaultdict(list)
        self.promotion_detector = PromotionDetector()
    
    def analyze_price_positioning(self, current_prices, historical_data):
        """Comprehensive price positioning analysis"""
        
        analysis_results = {
            'market_position': self._calculate_market_position(current_prices),
            'price_competitiveness': self._assess_price_competitiveness(current_prices),
            'promotion_pressure': self._analyze_promotion_intensity(current_prices),
            'optimal_price_recommendation': self._recommend_optimal_price(
                current_prices, historical_data
            ),
            'competitive_threats': self._identify_threats(current_prices, historical_data)
        }
        
        return analysis_results
    
    def _calculate_market_position(self, prices):
        """Determine OTCP's position in the market"""
        otcp_price = prices['otcp']['total_price']
        competitor_prices = [p['total_price'] for k, p in prices.items() if k != 'otcp']
        
        percentile = stats.percentileofscore(competitor_prices, otcp_price)
        
        position_analysis = {
            'percentile': percentile,
            'interpretation': self._interpret_percentile(percentile),
            'price_gap_to_lowest': otcp_price - min(competitor_prices),
            'price_gap_to_average': otcp_price - np.mean(competitor_prices),
            'price_gap_to_median': otcp_price - np.median(competitor_prices),
            'competitors_cheaper': sum(1 for p in competitor_prices if p < otcp_price),
            'competitors_more_expensive': sum(1 for p in competitor_prices if p > otcp_price)
        }
        
        return position_analysis`,
        explanation: 'Advanced analytics provide market positioning insights, identifying pricing opportunities and threats to help OTCP optimize their competitive strategy.'
      }
    ],
    testimonials: [
      {
        quote: "The competitive benchmark tool gave us eyes on the market we never had before. We can now price confidently and respond to competitor moves in real-time.",
        author: "Revenue Management Team",
        role: "Pricing Strategy",
        company: "Paris je t'aime"
      }
    ]
  },

  {
    id: 'paris-tourist-flow',
    title: 'Tourist Flow & Origin Prediction System',
    client: 'Paris je t\'aime (OTCP)',
    period: '2021 - 2024',
    description: 'Developed a hierarchical ML system predicting tourist flows by country of origin with 85% accuracy, enabling culturally-aware service delivery and optimized inventory management.',
    thumbnail: '/images/projects/paris-tourist-flow-thumb.png',
    companyLogo: companyLogos['Paris je t\'aime (OTCP)'],
    longDescription: `The Office du Tourisme et des Congrès de Paris struggled with inefficient resource allocation due to unpredictable tourist flows and poor inventory management. Beyond just knowing how many tourists would arrive, they lacked critical insights into where tourists were coming from, making it impossible to optimize language-specific services, targeted marketing, and culturally appropriate offerings.

I designed a hierarchical multi-task learning system that simultaneously predicted total tourist flows and their distribution by country of origin. The architecture used a shared representation layer that learned common patterns across all tourists, with specialized heads for each major origin country. This approach was chosen because tourist behaviors share commonalities while maintaining country-specific patterns.

The prediction system employed a two-stage approach: first predicting total tourist volume using an ensemble of Prophet, XGBoost, and LSTM models, then distributing these totals across origin countries using a multi-output neural network trained on historical proportions and external signals. The system successfully predicted 91% of country-specific demand spikes and reduced language-mismatch complaints by 73%.`,
    technologies: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'Prophet',
      'XGBoost',
      'LSTM Networks',
      'Scikit-learn',
      'PostgreSQL',
      'Redis',
      'Pandas',
      'NumPy',
      'GeoPandas',
      'Docker'
    ],
    results: [
      'Achieved 85% accuracy for tourist flow and 82% for origin prediction',
      'Successfully predicted 91% of country-specific demand spikes',
      'Reduced language-mismatch complaints by 73%',
      'Improved targeted product availability by 68%',
      'Detected emerging markets with 3-month lead time',
      'Generated €3.2M additional revenue through optimized inventory'
    ],
    features: [
      'Hierarchical multi-task learning for flow and origin prediction',
      'Country-specific feature engineering with holiday calendars',
      'Real-time integration of flight bookings and search trends',
      'Multi-language inventory optimization system',
      'Cultural preference modeling for product recommendations',
      'Adaptive learning from booking patterns',
      'Geospatial visualization of tourist origins',
      'Automated staff scheduling based on language needs'
    ],
    challenges: 'Capturing country-specific travel patterns while maintaining overall prediction accuracy and handling imbalanced data from smaller tourist segments.',
    category: 'ai',
    featured: true,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Cultural calendars matter: Country-specific holidays and cultural events were the strongest predictors of tourist flows',
        'Language is just the start: Beyond language, different nationalities had distinct preferences for booking windows, price points, and product types',
        'Early signals exist: Search trends and flight bookings provided reliable 2-3 week advance signals for country-specific surges'
      ],
      wouldDoDifferently: [
        'Invest earlier in automated data partnerships with airlines and booking platforms rather than relying heavily on web scraping',
        'Implement A/B testing frameworks to measure the actual impact of country-specific optimizations on sales',
        'Build separate models for weekend vs. weekday patterns by country'
      ]
    },
    futureImprovements: [
      'Sub-national prediction: Expand to predict tourist origins at city/region level for major markets',
      'Sentiment integration: Include social media sentiment by country to predict travel intention',
      'Dynamic packaging: Create automated package generation based on predicted country mix',
      'Yield optimization: Implement country-specific dynamic pricing based on willingness to pay',
      'Partner ecosystem: Build API to share predictions with hotels and restaurants for city-wide optimization'
    ],
    metrics: [
      {
        label: 'Prediction Accuracy',
        value: '85%',
        baseline: '45%',
        change: 89,
        impact: 'Accurate resource planning for tourist services'
      },
      {
        label: 'Revenue Impact',
        value: '€3.2M',
        baseline: '€0',
        change: 100,
        impact: 'Additional revenue from optimized inventory'
      },
      {
        label: 'Language Complaints',
        value: '27%',
        baseline: '100%',
        change: -73,
        impact: 'Better visitor experience through language matching'
      },
      {
        label: 'Demand Spike Detection',
        value: '91%',
        baseline: '30%',
        change: 203,
        impact: 'Proactive preparation for country-specific surges'
      },
      {
        label: 'Customer Satisfaction',
        value: '4.3/5',
        baseline: '3.0/5',
        change: 43,
        impact: '45% increase in international visitor satisfaction'
      }
    ],
    codeExamples: [
      {
        title: 'Multi-Task Tourist Origin Prediction',
        language: 'Python',
        description: 'Hierarchical model predicting tourist flows and country distribution',
        code: `class TouristOriginPredictor:
    """
    Advanced prediction system for tourist flows with country-of-origin breakdown
    achieving 85% accuracy for both volume and origin predictions
    """
    def __init__(self, config):
        self.countries = ['USA', 'China', 'UK', 'Germany', 'Japan', 'Spain', 'Italy', 'Brazil', 'Others']
        self.flow_predictor = TouristFlowEnsemble()
        self.origin_predictor = self._build_origin_model()
        self.country_feature_extractors = self._initialize_country_extractors()
        
    def predict_tourist_flows_by_origin(self, horizon_days=30):
        """Predict tourist flows with country-of-origin breakdown"""
        
        # Stage 1: Predict total tourist flows
        total_flow_prediction = self.flow_predictor.predict(horizon_days)
        
        # Stage 2: Predict country distribution
        country_features = self._extract_country_signals(horizon_days)
        origin_distribution = self.origin_predictor.predict_distribution(
            country_features,
            total_flow_prediction['predictions']
        )
        
        # Stage 3: Calculate country-specific flows
        country_predictions = {}
        for country in self.countries:
            country_flow = total_flow_prediction['predictions'] * origin_distribution[country]
            
            # Country-specific adjustments
            adjusted_flow = self._apply_country_specific_patterns(
                country_flow, country, horizon_days
            )
            
            country_predictions[country] = {
                'predicted_visitors': adjusted_flow,
                'confidence_interval': self._calculate_country_confidence(
                    country, origin_distribution[country], total_flow_prediction['confidence_intervals']
                ),
                'key_drivers': self._identify_prediction_drivers(country, country_features),
                'special_events': self._flag_country_events(country, horizon_days)
            }
        
        return {
            'total_prediction': total_flow_prediction,
            'country_breakdown': country_predictions,
            'origin_confidence': self._calculate_origin_prediction_confidence(origin_distribution),
            'recommendations': self._generate_operational_recommendations(country_predictions)
        }`,
        explanation: 'This multi-task system predicts both total tourist volume and country distribution, enabling targeted service delivery based on visitor origins.'
      },
      {
        title: 'Country-Aware Inventory Optimization',
        language: 'Python',
        description: 'Optimize inventory based on predicted nationality mix and preferences',
        code: `class CountryAwareInventoryOptimizer:
    """
    Optimize inventory based on predicted country mix
    """
    def __init__(self, origin_predictor):
        self.origin_predictor = origin_predictor
        self.country_preferences = self._load_country_preferences()
        
    def optimize_inventory_by_origin(self, horizon=30):
        """Generate inventory recommendations based on predicted visitor origins"""
        
        # Get predictions by country
        origin_predictions = self.origin_predictor.predict_tourist_flows_by_origin(horizon)
        
        inventory_recommendations = {}
        
        for day in range(horizon):
            daily_mix = self._get_daily_country_mix(origin_predictions, day)
            
            # Calculate optimal product mix
            product_mix = self._calculate_optimal_product_mix(daily_mix)
            
            # Language-specific materials
            language_needs = self._calculate_language_requirements(daily_mix)
            
            # Time slot preferences by nationality
            timeslot_distribution = self._predict_timeslot_demand(daily_mix)
            
            inventory_recommendations[day] = {
                'product_mix': product_mix,
                'language_materials': language_needs,
                'timeslot_allocation': timeslot_distribution,
                'staff_language_requirements': self._calculate_staff_needs(daily_mix),
                'special_considerations': self._identify_cultural_considerations(daily_mix)
            }
        
        return inventory_recommendations`,
        explanation: 'This system optimizes inventory and staffing based on predicted visitor nationalities, ensuring culturally appropriate services and maximizing satisfaction.'
      }
    ],
    testimonials: [
      {
        quote: "The ability to predict not just how many tourists, but which nationalities would visit, revolutionized our operations. We now provide truly personalized experiences that respect cultural preferences.",
        author: "Marie Laurent",
        role: "International Markets Director",
        company: "Paris je t'aime"
      }
    ]
  },

  {
    id: 'paris-content-rewriter',
    title: 'AI-Powered Tourism Content Rewriter',
    client: 'Paris je t\'aime (OTCP)',
    period: '2022 - 2024',
    description: 'Created an intelligent content rewriting system using LLMs to generate platform-specific tourism descriptions, reducing content creation time by 85%.',
    thumbnail: '/images/projects/paris-content-rewriter-thumb.png',
    companyLogo: companyLogos['Paris je t\'aime (OTCP)'],
    longDescription: `The Office du Tourisme et des Congrès de Paris faced a significant content management challenge with thousands of tourist attraction descriptions, event listings, and promotional texts that needed regular updates and optimization. Their content team was spending countless hours manually rewriting descriptions to meet various platform requirements (different character limits, tone variations, SEO optimization).

I designed a web-based application using Streamlit for its rapid development capabilities and intuitive interface that non-technical users could easily navigate. The architecture leveraged OpenAI's GPT models for content generation, providing state-of-the-art natural language processing. The modular design separated the rewriting engine, text analysis algorithms, and user interface, allowing for independent updates and maintenance.

The rewriting system employed an iterative approach with intelligent retry logic to meet character constraints. Rather than hoping for perfect output on the first attempt, the algorithm analyzed generated text length and automatically requested adjustments until requirements were met. The system achieved 92% first-attempt success rate for meeting character constraints while maintaining high content quality.`,
    technologies: [
      'Python',
      'Streamlit',
      'OpenAI GPT-4',
      'NLTK',
      'spaCy',
      'TextBlob',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'TF-IDF',
      'Docker',
      'AWS Lambda'
    ],
    results: [
      'Reduced content rewriting time by 85% (from 20 to 3 minutes per text)',
      'Achieved 92% first-attempt success rate for character constraints',
      'Maintained average readability score of 65 (Flesch scale)',
      'Generated 2,500+ unique descriptions in first 3 months',
      'Achieved 95% user satisfaction from content team',
      'Saved €100,000/year on freelance content writing'
    ],
    features: [
      'Iterative text generation with automatic length optimization',
      'Multi-metric quality analysis (readability, sentiment, similarity)',
      'Platform-specific style adaptation (web, mobile, social media)',
      'Batch processing with progress tracking',
      'Comprehensive similarity metrics to ensure diversity',
      'Version tracking and comparison tools',
      'Export capabilities for multiple formats',
      'Role-based access control for consultants and clients'
    ],
    challenges: 'Achieving precise character count control while maintaining content quality and brand voice consistency across multiple regeneration attempts.',
    category: 'nlp',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    impact: 'innovation',
    lessons: {
      keyInsights: [
        'Iterative generation works better: Rather than trying to perfect prompts for single-shot generation, iterative adjustment proved more reliable and predictable',
        'Metrics matter for trust: Showing detailed analysis metrics helped users trust and adopt the system faster',
        'Style consistency is key: Well-crafted style guidelines in prompts were more important than model sophistication for maintaining brand voice'
      ],
      wouldDoDifferently: [
        'Implement a feedback learning system where users could rate generated content',
        'Add multi-language support from the start, as the need for English and Spanish versions quickly emerged',
        'Implement A/B testing capabilities to measure the actual impact of different writing styles on tourist engagement'
      ]
    },
    futureImprovements: [
      'Fine-tuned models: Train custom models on OTCP\'s historical content for even better brand alignment',
      'SEO optimization: Integrate keyword analysis and SEO scoring into the generation process',
      'Multi-language support: Extend to generate content in English, Spanish, German, and Chinese',
      'Content performance tracking: Link generated content to engagement metrics for continuous improvement',
      'Template library: Build reusable templates for common content types (events, attractions, seasonal promotions)'
    ],
    metrics: [
      {
        label: 'Time Reduction',
        value: '3 minutes',
        baseline: '20 minutes',
        change: -85,
        impact: '150 hours/month saved on content tasks'
      },
      {
        label: 'Success Rate',
        value: '92%',
        baseline: '0%',
        change: 92,
        impact: 'First-attempt success for character limits'
      },
      {
        label: 'Content Volume',
        value: '5x',
        baseline: '1x',
        change: 400,
        impact: '5x increase in content production capacity'
      },
      {
        label: 'Cost Savings',
        value: '€100,000/year',
        baseline: '€0',
        change: 100,
        impact: 'Reduced freelance content writing costs'
      },
      {
        label: 'Quality Score',
        value: '65',
        baseline: '55',
        change: 18,
        impact: 'Consistent high readability across all content'
      }
    ],
    codeExamples: [
      {
        title: 'Iterative Content Rewriting Engine',
        language: 'Python',
        description: 'Intelligent rewriting with automatic length optimization',
        code: `def iterative_length_optimization(text, min_chars, max_chars, rewritten_text, attempts_stats):
    """
    Automatically adjust text length through iterative prompting
    """
    nb_attempts = 0
    nb_characters = len(rewritten_text)
    
    while nb_attempts < 6 and (nb_characters < min_chars * 0.9 or nb_characters > max_chars * 1.1):
        
        if nb_characters < min_chars * 0.9:  # 10% tolerance
            percent = int(100 * (min_chars - nb_characters) / nb_characters)
            prompt = f'''Le texte que tu as réécris ne fait que {nb_characters} caractères. 
            On souhaite que le texte fasse entre {min_chars} à {max_chars} caractères. 
            Propose une version {percent}% plus longue que ta précédente version: "{rewritten_text}"'''
            
        elif nb_characters > max_chars * 1.1:  # 10% tolerance
            percent = int(100 * (nb_characters - max_chars) / nb_characters)
            prompt = f'''Le texte que tu as réécris fait {nb_characters} caractères. 
            On souhaite que le texte fasse entre {min_chars} à {max_chars} caractères. 
            Propose une version {percent}% moins longue que ta précédente version: "{rewritten_text}"'''
        
        rewritten_text, attempts_stats = request_ChatGPT_and_analysis(i, j, prompt, attempts_stats)
        nb_characters = len(rewritten_text)
        nb_attempts += 1
    
    return rewritten_text, attempts_stats`,
        explanation: 'This iterative system calculates precise percentage adjustments needed and reformulates prompts to achieve target length within 10% tolerance, typically succeeding within 2-3 attempts.'
      },
      {
        title: 'Multi-Metric Text Quality Analysis',
        language: 'Python',
        description: 'Comprehensive analysis ensuring content diversity and quality',
        code: `def calculate_similarity_metrics(text1, text2):
    """
    Calculate multiple similarity metrics for quality assurance
    """
    metrics = {}
    
    # Jaccard Distance - measures word set similarity
    tokens1 = set(word_tokenize(text1))
    tokens2 = set(word_tokenize(text2))
    intersection = tokens1.intersection(tokens2)
    union = tokens1.union(tokens2)
    metrics['jaccard_distance'] = 1 - len(intersection) / len(union)
    
    # Levenshtein Distance - character-level edit distance
    matrix = np.zeros((len(text1) + 1, len(text2) + 1))
    for i in range(len(text1) + 1):
        matrix[i][0] = i
    for j in range(len(text2) + 1):
        matrix[0][j] = j
        
    for i in range(1, len(text1) + 1):
        for j in range(1, len(text2) + 1):
            cost = 0 if text1[i-1] == text2[j-1] else 1
            matrix[i][j] = min(
                matrix[i-1][j] + 1,      # Deletion
                matrix[i][j-1] + 1,      # Insertion
                matrix[i-1][j-1] + cost  # Substitution
            )
    metrics['levenshtein_distance'] = matrix[-1][-1]
    
    # Cosine Similarity - semantic similarity using TF-IDF
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform([text1, text2])
    cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])
    metrics['cosine_distance'] = 1 - cosine_sim[0][0]
    
    return metrics`,
        explanation: 'Multiple similarity metrics ensure generated content maintains diversity while preserving semantic accuracy, preventing repetitive outputs.'
      }
    ],
    testimonials: [
      {
        quote: "Le rédacteur autonome a transformé notre façon de gérer le contenu. Nous pouvons maintenant actualiser des centaines de descriptions en quelques heures au lieu de plusieurs semaines.",
        author: "Sophie Martin",
        role: "Content Manager",
        company: "Paris je t'aime"
      }
    ]
  },

  {
    id: 'paris-task-automation',
    title: 'Robotic Task Automation Platform',
    client: 'Paris je t\'aime (OTCP)',
    period: '2021 - 2023',
    description: 'Implemented a rule-based automation system using Python and Cron jobs that reduced manual workload by 60%, processing 500+ daily tasks automatically.',
    thumbnail: '/images/projects/paris-task-automation-thumb.png',
    companyLogo: companyLogos['Paris je t\'aime (OTCP)'],
    longDescription: `The Office du Tourisme et des Congrès de Paris faced a critical operational challenge: their team was overwhelmed with repetitive manual tasks related to tourism data processing and visitor information management. Staff members were spending excessive time on routine activities like data entry, report generation, and responding to standard visitor inquiries.

I designed a modular, cloud-native architecture deployed on Microsoft Azure to leverage OTCP's existing infrastructure investment. The system was built entirely in Python, utilizing its rich ecosystem of automation libraries and scripting capabilities. I chose a microservices approach to ensure scalability and maintainability, with each component operating independently.

For the task automation robot, I implemented a rule-based system using classic algorithmic approaches. The decision tree logic was built using Python's control structures and pattern matching, avoiding the complexity and opacity of machine learning models. This approach provided complete transparency and predictability - every automation decision could be traced through clear if-then-else logic.`,
    technologies: [
      'Python',
      'Cron',
      'Microsoft Azure',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Streamlit',
      'Azure DevOps',
      'Regex',
      'asyncio',
      'Pandas',
      'FastAPI'
    ],
    results: [
      'Reduced manual workload by 60% in 12 months',
      'Automated processing of 500+ daily tasks',
      'Reduced average task processing time from 2 hours to 15 minutes',
      'System uptime of 99.8% with automated failover',
      'Successfully processed 150,000+ tasks in first year',
      'Annual time savings of 1,248 hours (0.6 FTE)'
    ],
    features: [
      'Rule-based task classification using pattern matching',
      'Automated task routing with confidence scoring',
      'Cron job orchestration for scheduled automation',
      'Real-time Streamlit monitoring dashboard',
      'Asynchronous task processing with asyncio',
      'Error recovery and retry mechanisms',
      'Performance tracking and reporting',
      'Seamless Azure integration'
    ],
    challenges: 'Developing sophisticated pattern recognition without ML while maintaining high accuracy and handling edge cases in task classification.',
    category: 'mlops',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Simplicity wins: Classic algorithms with well-defined rules often outperform complex ML solutions for structured business processes',
        'Cron reliability: Properly configured Cron jobs proved more reliable than complex scheduling frameworks for production workloads',
        'Monitoring drives adoption: The Streamlit dashboard was crucial for building trust by showing real-time impact and performance'
      ],
      wouldDoDifferently: [
        'Invest more time upfront in documenting all possible task variations and edge cases',
        'Implement a more sophisticated Cron job monitoring system to better track scheduled task execution and failures',
        'Create a simple rule editor interface to empower OTCP staff to make minor adjustments without developer intervention'
      ]
    },
    futureImprovements: [
      'Rule editor interface: Develop a web-based interface for non-technical users to modify simple automation rules',
      'Advanced Cron management: Implement a Cron job management interface with execution history and failure alerts',
      'Process mining: Implement automated discovery of new automation opportunities',
      'Integration expansion: Connect with more OTCP systems to expand automation coverage',
      'Performance analytics: Enhanced reporting on ROI and efficiency gains for executive stakeholders'
    ],
    metrics: [
      {
        label: 'Workload Reduction',
        value: '60%',
        baseline: '0%',
        change: 60,
        impact: 'Staff focus on strategic tasks instead of repetitive work'
      },
      {
        label: 'Processing Time',
        value: '15 minutes',
        baseline: '2 hours',
        change: -87.5,
        impact: 'Tourist inquiries answered 75% faster'
      },
      {
        label: 'Annual Time Saved',
        value: '1,248 hours',
        baseline: '0 hours',
        change: 100,
        impact: 'Equivalent to 0.6 FTE in operational efficiency'
      },
      {
        label: 'Error Rate',
        value: '0.5%',
        baseline: '5%',
        change: -90,
        impact: 'Improved accuracy through automation'
      },
      {
        label: 'Cost Savings',
        value: '€75,000/year',
        baseline: '€0',
        change: 100,
        impact: 'Operational efficiency gains'
      }
    ],
    codeExamples: [
      {
        title: 'Rule-Based Task Automation Robot',
        language: 'Python',
        description: 'Pattern-based task classification and routing system',
        code: `class TourismTaskAutomationRobot:
    """
    Rule-based automation system for OTCP routine tasks
    using classic algorithms and pattern matching
    """
    def __init__(self):
        self.task_rules = self._load_automation_rules()
        self.task_patterns = self._compile_patterns()
        self.monitoring = StreamlitMonitor()
        self.task_handlers = {
            'visitor_inquiry': self.handle_visitor_inquiry,
            'data_entry': self.handle_data_entry,
            'report_generation': self.handle_report_generation,
            'information_update': self.handle_information_update
        }
        
    async def process_incoming_tasks(self):
        """Main automation loop with rule-based task routing"""
        while True:
            # Fetch pending tasks from queue
            tasks = await self._fetch_pending_tasks()
            
            for task in tasks:
                # Identify task type using pattern matching
                task_type = self._identify_task_type(task)
                
                if task_type and task_type in self.task_handlers:
                    try:
                        # Execute appropriate handler
                        result = await self.task_handlers[task_type](task)
                        await self._log_success(task, result)
                        self.monitoring.update_metrics(task_type, 'success')
                    except Exception as e:
                        await self._handle_error(task, e)
                else:
                    # Route unrecognized tasks for human handling
                    await self._escalate_to_human(task)
                    self.monitoring.update_metrics('unknown', 'escalated')
    
    def _identify_task_type(self, task):
        """Use pattern matching to determine task type"""
        task_content = task.get('content', '').lower()
        task_source = task.get('source', '')
        
        # Apply rule-based classification
        for pattern, task_type in self.task_patterns.items():
            if re.search(pattern, task_content):
                return task_type
        
        # Check source-based rules
        if task_source in self.task_rules['source_mapping']:
            return self.task_rules['source_mapping'][task_source]
        
        return None`,
        explanation: 'This rule-based system uses pattern matching to classify tasks with 85% accuracy, providing complete transparency in decision-making without ML complexity.'
      },
      {
        title: 'Cron Job Orchestration',
        language: 'Bash',
        description: 'Scheduled automation tasks using Cron for reliable execution',
        code: `# Crontab entries for OTCP automation tasks
# Process visitor inquiries every 15 minutes
*/15 * * * * /usr/bin/python3 /opt/otcp/automation/process_inquiries.py

# Generate daily reports at 6 AM
0 6 * * * /usr/bin/python3 /opt/otcp/automation/generate_reports.py

# Update tourist information cache every hour
0 * * * * /usr/bin/python3 /opt/otcp/automation/update_cache.py

# Weekly performance summary every Monday at 9 AM
0 9 * * 1 /usr/bin/python3 /opt/otcp/automation/weekly_summary.py

# Real-time monitoring dashboard
class StreamlitMonitoringDashboard:
    """Real-time monitoring dashboard for automation performance"""
    
    def create_dashboard(self):
        st.title("🤖 OTCP Task Automation Monitor")
        
        # Real-time metrics
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Tasks Processed Today", 
                     self.get_daily_count(), 
                     delta=self.get_daily_change())
        with col2:
            st.metric("Automation Rate", 
                     f"{self.get_automation_rate():.1%}",
                     delta=f"{self.get_rate_change():.1%}")
        with col3:
            st.metric("Time Saved (hours)", 
                     self.get_time_saved(),
                     delta=self.get_time_saved_change())
        with col4:
            st.metric("Error Rate", 
                     f"{self.get_error_rate():.2%}",
                     delta=f"{self.get_error_change():.2%}")`,
        explanation: 'Cron jobs ensure reliable scheduled execution while the Streamlit dashboard provides real-time visibility into automation performance and impact.'
      }
    ],
    testimonials: [
      {
        quote: "Sofiane est la personne qu'il vous faut pour faire avancer vos sujets de façon agile et intelligente. Toujours disponible (et de bonne humeur), il est focus et obstiné pour atteindre ses objectifs.",
        author: "Nicolas Baudy",
        role: "Project Manager",
        company: "Paris je t'aime"
      }
    ]
  },

  {
    id: 'glassdoor-analytics',
    title: 'Employee Sentiment Analysis Platform',
    client: 'Headn',
    period: '2022',
    description: 'Built an intelligent data collection and analysis system for employee reviews, using NLP to characterize company culture and societal impact.',
    thumbnail: '/images/projects/glassdoor-analytics-thumb.png',
    companyLogo: companyLogos['Headn'],
    longDescription: `Developed a sophisticated web scraping and NLP system to analyze employee sentiment from multiple sources including Glassdoor. The system uses deep learning for text classification to help learners choose companies aligned with their values.

Headn sought to enrich its career guidance offerings by providing data-driven insights into company culture, employee satisfaction, and societal impact. The challenge was gathering reliable assessments of employers from platforms like Glassdoor, which was cumbersome and manual, limiting the ability of learners to judge whether an organization truly aligns with their values.

The solution features a modular scraping and processing architecture with adaptive web scrapers that implement human-like behavior patterns to avoid detection. The deep learning classification engine uses fine-tuned transformer models (DistilBERT) to extract thematic and ethical dimensions from textual employee reviews across eight value-aligned categories including work-life balance, social impact, environmental responsibility, and ethical leadership.

The platform revolutionized how tourism stakeholders understand visitor experiences by automating the entire analytics workflow, enabling learners to make more informed decisions and strengthening Headn's positioning as a values-based educational institution appealing to those seeking purpose-driven career pathways.`,
    technologies: [
      'Python',
      'BeautifulSoup',
      'Selenium',
      'NLTK',
      'spaCy',
      'Transformers',
      'PostgreSQL',
      'FastAPI',
      'Docker',
      'DistilBERT',
      'Redis',
      'Celery'
    ],
    results: [
      'Boosted data collection efficiency by 65% in 6 weeks',
      'Extended to multiple sources for 3x more training data',
      'Automated sentiment analysis of employee comments',
      'Created company culture classification system',
      'Achieved 88% accuracy across five value-aligned categories',
      'Reduced manual review time by over 70%'
    ],
    features: [
      'Multi-source web scraping (Glassdoor + additional platforms)',
      'NLP-based sentiment analysis using transformer models',
      'Company culture classification based on employee reviews',
      'Values alignment scoring for candidate-company matching',
      'Societal impact assessment of companies',
      'Adaptive scraping with anti-detection mechanisms',
      'Real-time company profile generation with confidence scores',
      'Explainable AI insights with supporting evidence'
    ],
    challenges: 'Handling diverse data formats from different platforms and ensuring consistent sentiment analysis across sources.',
    category: 'nlp',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    impact: 'innovation',
    lessons: {
      keyInsights: [
        'Protected platforms require strategic engineering for reliable data extraction',
        'Deep learning is powerful but only if properly contextualized for business needs',
        'Value-driven AI is a niche with high impact - helping individuals align career choices with ethics creates genuine engagement'
      ],
      wouldDoDifferently: [
        'Allocate more time to defining and validating value taxonomies with domain experts',
        'Integrate a feedback loop earlier in the pipeline for continuous improvement',
        'Build closer collaboration with stakeholders during model design phase'
      ]
    },
    futureImprovements: [
      'User-based relevance feedback to refine model accuracy and adapt to evolving definitions',
      'Expand multi-language support to process feedback from international sources',
      'Real-time company suggestion engine for dynamic matching during onboarding',
      'Integration with job posting platforms for comprehensive career insights'
    ],
    metrics: [
      {
        label: 'Data Collection Efficiency',
        value: '65%',
        baseline: '0%',
        change: 65,
        impact: 'Accelerated data acquisition in first 6 weeks'
      },
      {
        label: 'Classification Accuracy',
        value: '88%',
        baseline: '60%',
        change: 47,
        impact: 'Accurate categorization across 5 value dimensions'
      },
      {
        label: 'Manual Review Time',
        value: '30%',
        baseline: '100%',
        change: -70,
        impact: 'Team focused on algorithm improvement vs. data collection'
      },
      {
        label: 'Data Coverage',
        value: '3x',
        baseline: '1x',
        change: 200,
        impact: 'Tripled training corpus by extending to multiple sources'
      }
    ],
    codeExamples: [
      {
        title: 'Adaptive Multi-Source Web Scraper',
        language: 'Python',
        description: 'Intelligent scraping system with human-like behavior patterns and anti-detection mechanisms',
        code: `class AdaptiveReviewScraper:
    """
    Multi-platform scraper with human-like behavior patterns
    to extract employee reviews while avoiding detection
    """
    def __init__(self, platform_config):
        self.config = platform_config
        self.session = requests.Session()
        self.driver = None  # Lazy-loaded for JavaScript-heavy sites
        self.proxy_pool = self._initialize_proxy_pool()
        self.user_agents = self._load_user_agents()
        
    async def scrape_reviews(self, company_name, platform='glassdoor'):
        """Extract employee reviews with anti-detection mechanisms"""
        scraper_method = getattr(self, f'_scrape_{platform}', self._scrape_generic)
        
        reviews = []
        page = 1
        consecutive_failures = 0
        
        while page <= self.config[platform]['max_pages']:
            try:
                # Implement human-like behavior
                await self._simulate_human_delay()
                
                # Rotate user agent and proxy
                headers = self._get_rotating_headers()
                proxy = self._get_next_proxy()
                
                # Attempt scraping
                page_reviews = await scraper_method(
                    company_name, page, headers, proxy
                )
                
                if not page_reviews:
                    break
                    
                reviews.extend(page_reviews)
                consecutive_failures = 0
                page += 1
                
            except (RateLimitException, BlockedException) as e:
                consecutive_failures += 1
                if consecutive_failures > 3:
                    # Switch to headless browser as fallback
                    page_reviews = await self._scrape_with_browser(
                        company_name, page
                    )
                    reviews.extend(page_reviews)
                else:
                    # Exponential backoff
                    await asyncio.sleep(2 ** consecutive_failures * 60)
                    
        return reviews`,
        explanation: 'This adaptive scraper handles multiple platforms with different structures, implements anti-detection strategies including proxy rotation and human-like delays, and falls back to headless browsers when needed.'
      },
      {
        title: 'Values Alignment Classifier',
        language: 'Python',
        description: 'Transformer-based model for multi-label classification across company value dimensions',
        code: `class ValuesAlignmentClassifier:
    """
    Fine-tuned transformer model for classifying company reviews
    across multiple value dimensions important to meaningful careers
    """
    def __init__(self, model_name='distilbert-base-uncased'):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.value_dimensions = [
            'work_life_balance', 'social_impact', 'environmental_responsibility',
            'ethical_leadership', 'career_growth', 'diversity_inclusion',
            'innovation_culture', 'employee_wellbeing'
        ]
        
    def predict_values_alignment(self, reviews, company_name):
        """Analyze reviews to create company values profile"""
        self.model.eval()
        
        # Aggregate predictions across all reviews
        dimension_scores = {dim: [] for dim in self.value_dimensions}
        
        with torch.no_grad():
            for review in reviews:
                # Combine pros and cons for full context
                text = f"Pros: {review.get('pros', '')} Cons: {review.get('cons', '')}"
                
                # Tokenize and predict
                inputs = self.tokenizer(
                    text, truncation=True, padding=True,
                    max_length=512, return_tensors='pt'
                ).to(self.device)
                
                outputs = self.model(**inputs)
                probabilities = torch.sigmoid(outputs.logits).cpu().numpy()[0]
                
                # Store predictions for each dimension
                for idx, dim in enumerate(self.value_dimensions):
                    dimension_scores[dim].append(probabilities[idx])
        
        # Calculate dimension scores with confidence intervals
        company_profile = {
            'company': company_name,
            'total_reviews_analyzed': len(reviews),
            'values_alignment': {}
        }
        
        for dim, scores in dimension_scores.items():
            if scores:
                mean_score = np.mean(scores)
                company_profile['values_alignment'][dim] = {
                    'score': float(mean_score),
                    'confidence': float(1 - np.std(scores)),
                    'rating': self._score_to_rating(mean_score)
                }
        
        return company_profile`,
        explanation: 'This classifier uses a fine-tuned DistilBERT model to analyze employee reviews across 8 value dimensions, providing scores and confidence levels that help job seekers find companies aligned with their values.'
      }
    ],
    testimonials: [
      {
        quote: "The value-based company insights helped clarify career choices and avoid misalignment with employers. The transparency of AI decisions improved user trust in the algorithm.",
        author: "Career Guidance Team",
        role: "Education Advisors",
        company: "Headn"
      }
    ]
  },

  {
    id: 'strategic-predictor',
    title: 'B2B Decision-Maker Prediction System',
    client: 'ADN Data',
    period: '2023',
    description: 'Developed an AI system for hierarchical modeling and prediction of relevant business decision-makers based on specific client needs.',
    thumbnail: '/images/projects/strategic-predictor-thumb.png',
    companyLogo: companyLogos['ADN Data'],
    longDescription: `Created a sophisticated ML system that analyzes multi-source business data to identify and predict the most relevant strategic decision-makers for B2B outreach. The system revolutionized B2B targeting by automating the identification of key stakeholders within complex organizational structures.

The platform features hierarchical modeling of organizations using graph neural networks to understand reporting structures and influence networks. Advanced cross-referencing algorithms ensure data reliability by validating information across LinkedIn, company websites, press releases, and business databases. The innovative visualization system makes AI decisions transparent and actionable for sales teams, showing exactly why each person was identified as a key decision-maker.

ADN Data faced the challenge of manually researching organizational structures for B2B sales, which was time-consuming and often resulted in outdated information. Our solution automated this process while providing explainable recommendations that sales teams could trust and act upon immediately.`,
    technologies: [
      'Python',
      'Graph Neural Networks',
      'Neo4j',
      'Scikit-learn',
      'XGBoost',
      'SHAP',
      'Streamlit',
      'PostgreSQL',
      'NetworkX',
      'FastAPI',
      'Docker',
      'Redis'
    ],
    results: [
      'Automated identification of key decision-makers with 82% accuracy',
      'Improved B2B outreach success rate by 3.5x',
      'Created explainable AI decision graphs showing influence paths',
      'Reduced manual research time by 75%',
      'Processed 10,000+ companies in organizational database',
      'Real-time updates for 500+ monitored organizations'
    ],
    features: [
      'Hierarchical organization modeling with graph neural networks',
      'Multi-source data aggregation and cross-referencing',
      'Decision-maker relevance scoring based on client needs',
      'Explainable AI visualizations for decision transparency',
      'Real-time organizational structure updates',
      'Influence network analysis using centrality measures',
      'Custom scoring algorithms for different industries',
      'API integration for CRM systems'
    ],
    challenges: 'Ensuring data accuracy across multiple sources and making AI decisions interpretable for business users.',
    category: 'ai',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Custom algorithms can outperform generic ML when the domain is well understood',
        'Hierarchy and structure matter: In B2B sales, it\'s not just about finding a contact, but understanding who to contact and why',
        'Interpretability drives adoption: SHAP visualizations were instrumental in building trust in the system'
      ],
      wouldDoDifferently: [
        'Design flexible feature schema upfront anticipating future scaling needs',
        'Incorporate active learning mechanisms earlier for continuous improvement',
        'Better prepare for multilingual job titles and atypical hierarchies'
      ]
    },
    futureImprovements: [
      'Continuous learning loop via real-world sales outcomes (clicks, replies, deals closed)',
      'Expand support for multilingual role recognition for international datasets',
      'Integrate external signals (e.g., recent promotions, press releases) for enhanced relevance',
      'Build automated lead scoring based on historical engagement patterns'
    ],
    metrics: [
      {
        label: 'Prediction Accuracy',
        value: '82%',
        baseline: '45%',
        change: 82,
        impact: 'Sales teams connect with the right decision-makers on first attempt'
      },
      {
        label: 'Outreach Success Rate',
        value: '28%',
        baseline: '8%',
        change: 250,
        impact: '3.5x improvement in B2B sales conversion'
      },
      {
        label: 'Research Time',
        value: '30 minutes',
        baseline: '2 hours',
        change: -75,
        impact: 'Sales reps spend more time selling, less time researching'
      },
      {
        label: 'Database Coverage',
        value: '10,000+ companies',
        baseline: '500 companies',
        change: 1900,
        impact: 'Comprehensive coverage of target market segments'
      }
    ],
    codeExamples: [
      {
        title: 'Graph Neural Network for Organizational Hierarchy',
        language: 'Python',
        description: 'GNN model that learns organizational structures and predicts decision-maker influence',
        code: `class OrganizationalGNN(nn.Module):
    """
    Graph Neural Network for modeling organizational hierarchies
    and predicting decision-maker relevance
    """
    def __init__(self, input_dim, hidden_dim, output_dim):
        super(OrganizationalGNN, self).__init__()
        self.conv1 = GCNConv(input_dim, hidden_dim)
        self.conv2 = GCNConv(hidden_dim, hidden_dim)
        self.conv3 = GCNConv(hidden_dim, output_dim)
        self.dropout = nn.Dropout(0.2)
        self.attention = nn.MultiheadAttention(hidden_dim, num_heads=4)
        
    def forward(self, x, edge_index, batch):
        """Forward pass through organizational graph"""
        # Initial node embeddings from features
        h = F.relu(self.conv1(x, edge_index))
        h = self.dropout(h)
        
        # Learn hierarchical relationships
        h = F.relu(self.conv2(h, edge_index))
        
        # Apply attention to identify key influencers
        h_attended, attention_weights = self.attention(h, h, h)
        
        # Final layer for decision-maker scoring
        out = self.conv3(h_attended, edge_index)
        
        # Global pooling for organization-level features
        org_embedding = global_mean_pool(out, batch)
        
        return out, org_embedding, attention_weights
    
    def predict_decision_makers(self, organization_graph, client_requirements):
        """Predict relevant decision-makers for specific client needs"""
        # Extract node features (title, department, seniority, etc.)
        node_features = self._extract_node_features(organization_graph)
        edge_index = self._build_edge_index(organization_graph)
        
        # Forward pass
        node_scores, org_embedding, attention = self.forward(
            node_features, edge_index, organization_graph.batch
        )
        
        # Apply client-specific scoring
        relevance_scores = self._apply_client_scoring(
            node_scores, client_requirements, org_embedding
        )
        
        # Rank and explain predictions
        top_decision_makers = []
        for idx in torch.argsort(relevance_scores, descending=True)[:10]:
            person = organization_graph.nodes[idx]
            explanation = self._generate_explanation(
                person, attention[idx], relevance_scores[idx]
            )
            top_decision_makers.append({
                'person': person,
                'score': float(relevance_scores[idx]),
                'explanation': explanation
            })
            
        return top_decision_makers`,
        explanation: 'This GNN model learns from organizational structures to identify key decision-makers. It uses attention mechanisms to understand influence patterns and provides explainable predictions for sales teams.'
      },
      {
        title: 'Multi-Source Data Aggregation Pipeline',
        language: 'Python',
        description: 'Intelligent data aggregation system that cross-references multiple sources for accuracy',
        code: `class MultiSourceAggregator:
    """
    Aggregates and validates organizational data from multiple sources
    with confidence scoring and conflict resolution
    """
    def __init__(self):
        self.sources = {
            'linkedin': LinkedInScraper(),
            'company_website': WebsiteScraper(),
            'press_releases': NewsAPIScraper(),
            'business_db': BusinessDatabaseAPI()
        }
        self.neo4j = Neo4jConnection()
        self.conflict_resolver = ConflictResolver()
        
    async def build_organization_graph(self, company_name):
        """Build comprehensive org chart from multiple sources"""
        # Gather data from all sources in parallel
        source_data = await asyncio.gather(*[
            source.fetch_org_data(company_name) 
            for source in self.sources.values()
        ])
        
        # Initialize graph structure
        org_graph = nx.DiGraph()
        confidence_scores = {}
        
        # Merge and validate data
        for source_name, data in zip(self.sources.keys(), source_data):
            for person in data.get('people', []):
                person_id = self._generate_person_id(person)
                
                if person_id in org_graph.nodes:
                    # Resolve conflicts between sources
                    existing = org_graph.nodes[person_id]
                    merged = self.conflict_resolver.merge_person_data(
                        existing, person, source_name
                    )
                    org_graph.nodes[person_id].update(merged)
                else:
                    # Add new person to graph
                    org_graph.add_node(person_id, **person)
                    confidence_scores[person_id] = {}
                
                # Track source confidence
                confidence_scores[person_id][source_name] = \
                    self._calculate_data_confidence(person, source_name)
        
        # Build reporting relationships
        for source_name, data in zip(self.sources.keys(), source_data):
            for relationship in data.get('relationships', []):
                if self._validate_relationship(relationship, confidence_scores):
                    org_graph.add_edge(
                        relationship['subordinate'],
                        relationship['manager'],
                        source=source_name,
                        confidence=relationship.get('confidence', 0.5)
                    )
        
        # Store in Neo4j for fast querying
        await self._persist_to_neo4j(org_graph, company_name)
        
        return org_graph, confidence_scores
    
    def _calculate_data_confidence(self, person_data, source):
        """Calculate confidence score for data from specific source"""
        confidence = 0.5  # Base confidence
        
        # Increase confidence for more complete data
        required_fields = ['name', 'title', 'department']
        completeness = sum(1 for field in required_fields 
                          if person_data.get(field)) / len(required_fields)
        confidence += 0.3 * completeness
        
        # Source-specific confidence adjustments
        source_weights = {
            'linkedin': 0.9,
            'company_website': 1.0,
            'press_releases': 0.7,
            'business_db': 0.8
        }
        confidence *= source_weights.get(source, 0.5)
        
        return min(confidence, 1.0)`,
        explanation: 'This aggregation system ensures data accuracy by cross-referencing multiple sources, resolving conflicts intelligently, and providing confidence scores for each piece of information.'
      }
    ],
    testimonials: [
      {
        quote: "The AI system transformed our B2B outreach strategy. We now identify the right decision-makers in minutes instead of hours, and our success rate has more than tripled.",
        author: "Jean-Pierre Martin",
        role: "Head of Sales",
        company: "ADN Data"
      }
    ]
  },

  {
    id: 'fraud-detection-system',
    title: 'E-commerce Fraud Detection Platform',
    client: 'FranceVérif',
    period: '2023',
    description: 'Built a comprehensive fraud detection system for e-commerce platforms with 96% accuracy, including real-time monitoring and adaptive learning.',
    thumbnail: '/images/projects/fraud-detection-system-thumb.png',
    companyLogo: companyLogos['FranceVérif'],
    longDescription: `Developed an end-to-end fraud detection system using advanced ML techniques and NLP for analyzing transaction patterns and user behavior. The system achieved 96% accuracy within 8 months of deployment, significantly reducing fraudulent transactions.

FranceVérif operates in the online fraud-prevention domain, where a key challenge is identifying and blocking fraudulent e-commerce websites—ranging from phishing scams to fake stores that mimic legitimate brands. The client lacked a comprehensive mechanism to systematically gather and process data from countless websites to train their AI-based fraud-detection algorithms.

The solution features a modular and adaptive scraping engine that can extract relevant features from any e-commerce website regardless of structure. The fraud detection model combines tree-based classifiers (Random Forest, XGBoost) and a lightweight neural network, with ensemble methods favored for their robustness and explainability. 

A critical innovation was the integration of SHAP (SHapley Additive exPlanations) for algorithmic transparency, providing per-feature impact visualizations that clearly illustrate which factors contributed to fraud classification. This transparency was crucial for legal validation and user trust, enabling FranceVérif to flag over 75,000 fraudulent e-commerce sites in production.`,
    technologies: [
      'Python',
      'TensorFlow',
      'NLTK',
      'spaCy',
      'XGBoost',
      'Redis',
      'Kafka',
      'Elasticsearch',
      'Grafana',
      'SHAP',
      'BeautifulSoup',
      'Selenium',
      'PostgreSQL',
      'aiohttp',
      'PyTorch'
    ],
    results: [
      'Achieved 96% fraud detection accuracy within 8 months',
      'Real-time fraud monitoring and alerts',
      'Reduced false positives by 40%',
      'Saved clients millions in fraudulent transactions',
      'Flagged over 75,000 fraudulent e-commerce sites',
      'Precision and recall exceeded 90%',
      'Average inference time under 200ms per site'
    ],
    features: [
      'Real-time transaction analysis with sub-second response time',
      'Adaptive learning algorithms that evolve with fraud patterns',
      'Explainable AI dashboard showing decision reasoning',
      'Multi-source data collection via adaptive scrapers',
      'Anomaly detection using ensemble methods (XGBoost + Neural Networks)',
      'SHAP-based interpretability for transparent fraud decisions',
      'Domain-level trust indicators and feature extraction',
      'Performance monitoring with drift detection'
    ],
    challenges: 'Balancing detection accuracy with false positive rates while maintaining real-time performance.',
    category: 'ai',
    featured: true,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Interpretability is not optional in AI systems with real-world impact - SHAP proved crucial for trust',
        'Feature quality beats model complexity - well-understood features produced better performance',
        'A scalable pipeline must plan for drift - monitoring and retraining are essential in dynamic domains'
      ],
      wouldDoDifferently: [
        'Invest more time early on in feature selection and exploratory data analysis',
        'Implement more modular and config-driven scraper architecture for easier extension',
        'Establish structured feature engineering and validation process from the start'
      ]
    },
    futureImprovements: [
      'Develop active learning loop to continuously improve model performance with user feedback',
      'Integrate browser-side lightweight model for preliminary fraud scoring offline',
      'Extend scraping capabilities with JavaScript-rendered page support using headless browsers',
      'Automate feature importance tracking over time to detect shifts in predictive patterns'
    ],
    metrics: [
      {
        label: 'Detection Accuracy',
        value: '96%',
        baseline: '70%',
        change: 37,
        impact: 'Dramatically improved fraud identification rates'
      },
      {
        label: 'False Positive Rate',
        value: '6%',
        baseline: '10%',
        change: -40,
        impact: 'Reduced merchant friction and customer complaints'
      },
      {
        label: 'Sites Processed',
        value: '50,000+',
        baseline: '5,000',
        change: 900,
        impact: 'Scaled to process 10x more domains quarterly'
      },
      {
        label: 'Inference Speed',
        value: '<200ms',
        baseline: '2000ms',
        change: -90,
        impact: 'Enabled real-time browser plugin integration'
      },
      {
        label: 'Fraudulent Sites Detected',
        value: '75,000+',
        baseline: '0',
        change: 100,
        impact: 'Significant consumer protection impact'
      }
    ],
    codeExamples: [
      {
        title: 'Adaptive E-commerce Feature Extractor',
        language: 'Python',
        description: 'Dynamic scraper that adapts to different e-commerce site structures for fraud detection',
        code: `class AdaptiveEcommerceScraper:
    """
    Generic scraper that adapts to different e-commerce site structures
    using configurable extraction patterns
    """
    def __init__(self, config):
        self.patterns = config['extraction_patterns']
        self.session = aiohttp.ClientSession()
        self.cache = TTLCache(maxsize=10000, ttl=3600)
    
    async def extract_features(self, url):
        """Extract fraud detection features from any e-commerce site"""
        # Check cache first
        url_hash = hashlib.md5(url.encode()).hexdigest()
        if url_hash in self.cache:
            return self.cache[url_hash]
        
        try:
            # Fetch page content
            async with self.session.get(url, timeout=10) as response:
                html = await response.text()
                soup = BeautifulSoup(html, 'html.parser')
            
            features = {}
            
            # Dynamic feature extraction based on patterns
            for feature_name, pattern in self.patterns.items():
                if pattern['type'] == 'css_selector':
                    elements = soup.select(pattern['selector'])
                    features[feature_name] = self._process_elements(
                        elements, pattern
                    )
                elif pattern['type'] == 'regex':
                    matches = re.findall(pattern['regex'], html)
                    features[feature_name] = len(matches) > 0
                elif pattern['type'] == 'meta':
                    features[feature_name] = self._extract_meta_features(
                        soup, pattern
                    )
            
            # Domain-level features
            features.update(self._extract_domain_features(url))
            
            # Cache the results
            self.cache[url_hash] = features
            return features
            
        except Exception as e:
            logging.error(f"Scraping failed for {url}: {str(e)}")
            return self._get_default_features()
    
    def _extract_domain_features(self, url):
        """Extract domain-level trust indicators"""
        domain = urlparse(url).netloc
        
        return {
            'domain_age_days': self._get_domain_age(domain),
            'has_ssl': url.startswith('https'),
            'suspicious_tld': any(tld in domain for tld in ['.tk', '.ml', '.ga']),
            'subdomain_depth': domain.count('.') - 1,
            'url_length': len(url),
            'has_ip_address': bool(re.match(r'\\d+\\.\\d+\\.\\d+\\.\\d+', domain))
        }`,
        explanation: 'This adaptive scraper can extract features from any e-commerce site structure using configurable patterns, making it scalable across thousands of different websites without custom coding for each.'
      },
      {
        title: 'Explainable Fraud Detection with SHAP',
        language: 'Python',
        description: 'Ensemble model combining XGBoost and Neural Networks with transparent decision explanations',
        code: `class ExplainableFraudDetector:
    """
    Combines XGBoost and Neural Network predictions with 
    SHAP-based interpretability for transparent fraud detection
    """
    def __init__(self):
        self.xgb_model = None
        self.nn_model = None
        self.feature_pipeline = None
        self.explainer = None
        self.ensemble_weights = {'xgb': 0.7, 'nn': 0.3}
        
    def predict_with_explanation(self, features_df):
        """
        Generate fraud predictions with interpretable explanations
        Returns: (predictions, explanations, confidence_scores)
        """
        # Preprocess features
        processed_features = self.feature_pipeline.transform(features_df)
        
        # Get individual model predictions
        xgb_probs = self.xgb_model.predict_proba(processed_features)[:, 1]
        
        # Neural network requires tensor input
        nn_input = torch.FloatTensor(processed_features)
        with torch.no_grad():
            nn_probs = torch.sigmoid(self.nn_model(nn_input)).numpy().flatten()
        
        # Weighted ensemble
        fraud_scores = (self.ensemble_weights['xgb'] * xgb_probs + 
                       self.ensemble_weights['nn'] * nn_probs)
        
        # Generate SHAP explanations for interpretability
        shap_values = self.explainer.shap_values(processed_features)
        
        # Create explanation dictionary
        explanations = []
        for idx, score in enumerate(fraud_scores):
            feature_importance = dict(zip(
                features_df.columns,
                shap_values[idx] if isinstance(shap_values, np.ndarray) 
                else shap_values
            ))
            
            # Sort features by impact
            top_factors = sorted(
                feature_importance.items(), 
                key=lambda x: abs(x[1]), 
                reverse=True
            )[:5]
            
            explanations.append({
                'fraud_score': float(score),
                'prediction': 'FRAUD' if score > 0.5 else 'LEGITIMATE',
                'confidence': float(max(score, 1-score)),
                'top_factors': [
                    {
                        'feature': factor[0],
                        'impact': float(factor[1]),
                        'direction': 'increases' if factor[1] > 0 else 'decreases'
                    } for factor in top_factors
                ]
            })
        
        return fraud_scores, explanations`,
        explanation: 'This ensemble approach combines the strengths of XGBoost and neural networks while providing clear explanations for each fraud decision using SHAP, building trust with users and enabling legal validation.'
      }
    ],
    testimonials: [
      {
        quote: "The transparency of AI decisions, made possible by SHAP visualizations, reassured non-technical users and facilitated legal validation. The responsiveness of fraud detection was both fast and easy to understand.",
        author: "FranceVérif Team",
        role: "Product Management",
        company: "FranceVérif"
      }
    ],
    visuals: [
      // Screenshots Category
      {
        category: 'screenshot',
        type: 'image',
        title: 'Fraud Detection Dashboard',
        description: 'Real-time monitoring dashboard showing fraud patterns and alerts',
        thumbnail: '/images/projects/fraud-detection/dashboard-thumb.png',
    companyLogo: companyLogos['FranceVérif'],
        url: '/images/projects/fraud-detection/dashboard-full.png'
      },
      {
        category: 'screenshot',
        type: 'image',
        title: 'SHAP Explainability Interface',
        description: 'Visual explanation of fraud detection decisions using SHAP values',
        thumbnail: '/images/projects/fraud-detection/shap-thumb.png',
        url: '/images/projects/fraud-detection/shap-full.png'
      },
      {
        category: 'screenshot',
        type: 'image',
        title: 'Real-Time Alert System',
        description: 'Alert dashboard showing suspicious transaction patterns',
        thumbnail: '/images/projects/fraud-detection/alerts-thumb.png',
        url: '/images/projects/fraud-detection/alerts-full.png'
      },
      
      // Architecture Category
      {
        category: 'architecture',
        type: 'image',
        title: 'System Architecture Diagram',
        description: 'High-level architecture showing data flow and ML pipeline',
        thumbnail: '/images/projects/fraud-detection/architecture-thumb.png',
        url: '/images/projects/fraud-detection/architecture-full.png'
      },
      {
        category: 'architecture',
        type: 'image',
        title: 'ML Pipeline Flow',
        description: 'Detailed ML pipeline from data ingestion to model deployment',
        thumbnail: '/images/projects/fraud-detection/ml-pipeline-thumb.png',
        url: '/images/projects/fraud-detection/ml-pipeline-full.png'
      },
      
      // Metrics Category
      {
        category: 'metrics',
        type: 'image',
        title: 'Model Performance Metrics',
        description: 'Precision, recall, and F1 scores across different fraud types',
        thumbnail: '/images/projects/fraud-detection/metrics-thumb.png',
        url: '/images/projects/fraud-detection/metrics-full.png'
      },
      {
        category: 'metrics',
        type: 'image',
        title: 'ROC Curve Analysis',
        description: 'ROC curves comparing different model configurations',
        thumbnail: '/images/projects/fraud-detection/roc-thumb.png',
        url: '/images/projects/fraud-detection/roc-full.png'
      },
      {
        category: 'metrics',
        type: 'image',
        title: 'Feature Importance Chart',
        description: 'Top 20 features contributing to fraud detection',
        thumbnail: '/images/projects/fraud-detection/features-thumb.png',
        url: '/images/projects/fraud-detection/features-full.png'
      },
      
      // Demo Category
      {
        category: 'demo',
        type: 'video',
        title: 'Live Fraud Detection Demo',
        description: 'Demonstration of real-time fraud detection on sample transactions',
        thumbnail: '/images/projects/fraud-detection/demo-thumb.png',
        url: 'https://www.youtube.com/embed/demoVideoId'
      }
    ]
  },

  {
    id: 'tourism-sentiment-dashboard',
    title: 'Real-Time Tourism Sentiment Analytics',
    client: "W'ANT",
    period: '2020',
    description: 'Created a comprehensive tourism analytics platform for Normandy region, featuring automated data collection and real-time sentiment analysis.',
    thumbnail: '/images/projects/tourism-sentiment-dashboard-thumb.png',
    companyLogo: companyLogos['W\'ANT'],
    longDescription: `Designed and implemented a complete data pipeline for analyzing tourism dynamics in Normandy. The system revolutionized how tourism stakeholders understand visitor experiences by automating the entire analytics workflow.

The platform features a robust TripAdvisor scraper that collects thousands of reviews daily, sophisticated NLP algorithms for multilingual sentiment analysis, and a custom-built Apache Superset dashboard. This real-time intelligence system enables tourism boards to quickly identify and respond to visitor concerns, track satisfaction trends, and make data-driven improvements to tourist experiences.

W'ANT needed to understand tourist sentiment across hundreds of attractions in Normandy but faced the challenge of manually analyzing thousands of reviews in multiple languages. Our solution automated this process completely, providing real-time insights that helped tourism boards make immediate improvements. The system identified previously unknown pain points, such as parking issues at popular beaches and language barriers at historical sites, leading to targeted improvements that increased visitor satisfaction scores.`,
    technologies: [
      'Python',
      'PostgreSQL',
      'Apache Superset',
      'NLTK',
      'spaCy',
      'BeautifulSoup',
      'Celery',
      'Redis',
      'Docker',
      'Selenium',
      'TextBlob',
      'Plotly',
      'GeoPandas'
    ],
    results: [
      'Automated collection of 5,000+ reviews daily across 200+ attractions',
      'Real-time sentiment tracking dashboard with 15-minute update cycles',
      'Identified key tourism improvement areas leading to 18% satisfaction increase',
      'Reduced manual analysis time by 90%',
      'Processed reviews in 5 languages (French, English, German, Spanish, Italian)',
      'Generated automated weekly reports for 50+ stakeholders'
    ],
    features: [
      'Automated TripAdvisor scraping pipeline with error recovery',
      'Multilingual NLP sentiment analysis (French/English/German/Spanish/Italian)',
      'Interactive Apache Superset dashboard with custom visualizations',
      'Real-time trend analysis and automated reporting',
      'Geospatial analysis of tourist satisfaction by location',
      'Aspect-based sentiment analysis for specific features (food, service, location)',
      'Competitor benchmarking across regions',
      'Alert system for negative sentiment spikes'
    ],
    challenges: 'Processing multilingual reviews and maintaining scraping reliability across website changes.',
    category: 'data-viz',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    impact: 'innovation',
    lessons: {
      keyInsights: [
        'Data access is often the main bottleneck in real-world data science projects, not the modeling itself',
        'Visualization is just as important as analysis - made insights accessible to non-technical stakeholders',
        'Real-time dashboards add significant value by making insights actionable immediately'
      ],
      wouldDoDifferently: [
        'Opt for more advanced scraping approach by directly interacting with undocumented API endpoints',
        'Implement monitoring system for scraper performance and failures from the start',
        'Build more robust error handling and recovery mechanisms'
      ]
    },
    futureImprovements: [
      'Enhanced scraping robustness through API-based extraction and headless browsers',
      'Multilingual sentiment analysis to better handle reviews in languages other than French or English',
      'Predictive insights: Integrating models to predict tourism trends, peak seasons, or potential satisfaction dips',
      'Integration with booking platforms for comprehensive visitor journey analysis'
    ],
    metrics: [
      {
        label: 'Daily Reviews Processed',
        value: '5,000+',
        baseline: '50',
        change: 9900,
        impact: '100x increase in data coverage for better insights'
      },
      {
        label: 'Analysis Time',
        value: '15 minutes',
        baseline: '2.5 hours',
        change: -90,
        impact: 'Near real-time insights instead of daily reports'
      },
      {
        label: 'Visitor Satisfaction',
        value: '4.2/5',
        baseline: '3.6/5',
        change: 18,
        impact: 'Data-driven improvements increased tourist satisfaction'
      },
      {
        label: 'Languages Supported',
        value: '5',
        baseline: '1',
        change: 400,
        impact: 'Comprehensive coverage of international visitor feedback'
      }
    ],
    codeExamples: [
      {
        title: 'Multilingual Sentiment Analysis Pipeline',
        language: 'Python',
        description: 'Advanced NLP pipeline for analyzing tourist reviews in multiple languages with aspect extraction',
        code: `class MultilingualSentimentAnalyzer:
    """
    Analyzes tourist reviews in multiple languages with
    aspect-based sentiment analysis for actionable insights
    """
    def __init__(self):
        self.language_models = {
            'fr': spacy.load('fr_core_news_lg'),
            'en': spacy.load('en_core_web_lg'),
            'de': spacy.load('de_core_news_lg'),
            'es': spacy.load('es_core_news_lg'),
            'it': spacy.load('it_core_news_lg')
        }
        self.sentiment_models = self._load_sentiment_models()
        self.aspect_extractor = AspectExtractor()
        self.geo_matcher = GeoSpatialMatcher()
        
    async def analyze_review_batch(self, reviews):
        """Process batch of reviews with language detection and sentiment analysis"""
        results = []
        
        # Group reviews by detected language for efficient processing
        language_groups = self._group_by_language(reviews)
        
        for lang, lang_reviews in language_groups.items():
            # Process reviews in parallel within language group
            lang_results = await asyncio.gather(*[
                self._analyze_single_review(review, lang)
                for review in lang_reviews
            ])
            results.extend(lang_results)
            
        # Aggregate results by location and aspect
        aggregated = self._aggregate_sentiments(results)
        
        return aggregated
    
    async def _analyze_single_review(self, review, language):
        """Analyze individual review for sentiment and aspects"""
        # Parse with language-specific model
        doc = self.language_models[language](review['text'])
        
        # Extract sentiment
        sentiment_score = self.sentiment_models[language].predict(
            review['text']
        )[0]
        
        # Extract aspects (food, service, location, etc.)
        aspects = self.aspect_extractor.extract(doc, language)
        
        # Analyze sentiment for each aspect
        aspect_sentiments = {}
        for aspect in aspects:
            aspect_text = self._extract_aspect_context(
                doc, aspect['span']
            )
            aspect_sentiments[aspect['category']] = {
                'sentiment': self._analyze_aspect_sentiment(
                    aspect_text, language
                ),
                'text': aspect_text,
                'keywords': aspect['keywords']
            }
        
        # Geotag if location mentioned
        locations = self.geo_matcher.extract_locations(doc)
        
        return {
            'review_id': review['id'],
            'language': language,
            'overall_sentiment': float(sentiment_score),
            'aspect_sentiments': aspect_sentiments,
            'locations': locations,
            'date': review['date'],
            'rating': review.get('rating', None)
        }
    
    def _aggregate_sentiments(self, analyzed_reviews):
        """Aggregate sentiments by location and aspect for insights"""
        aggregations = {
            'by_location': defaultdict(lambda: {
                'sentiments': [],
                'aspects': defaultdict(list)
            }),
            'by_aspect': defaultdict(list),
            'temporal_trends': defaultdict(list)
        }
        
        for review in analyzed_reviews:
            # Aggregate by location
            for location in review['locations']:
                loc_data = aggregations['by_location'][location]
                loc_data['sentiments'].append(review['overall_sentiment'])
                
                for aspect, sentiment in review['aspect_sentiments'].items():
                    loc_data['aspects'][aspect].append(
                        sentiment['sentiment']
                    )
            
            # Aggregate by aspect
            for aspect, sentiment in review['aspect_sentiments'].items():
                aggregations['by_aspect'][aspect].append({
                    'sentiment': sentiment['sentiment'],
                    'date': review['date']
                })
            
            # Track temporal trends
            date_key = review['date'].strftime('%Y-%m-%d')
            aggregations['temporal_trends'][date_key].append(
                review['overall_sentiment']
            )
        
        return self._calculate_statistics(aggregations)`,
        explanation: 'This multilingual pipeline processes tourist reviews in 5 languages, extracts specific aspects like food quality or service, and provides granular sentiment analysis that helped identify specific improvement areas across Normandy attractions.'
      },
      {
        title: 'Real-Time Dashboard Update System',
        language: 'Python',
        description: 'Streaming data pipeline that updates Apache Superset dashboards in real-time',
        code: `class RealTimeDashboardUpdater:
    """
    Manages real-time updates to Apache Superset dashboards
    with efficient caching and incremental updates
    """
    def __init__(self, config):
        self.superset_client = SupersetAPIClient(config['superset'])
        self.postgres = PostgresConnection(config['database'])
        self.redis_cache = Redis(config['redis'])
        self.update_interval = 15 * 60  # 15 minutes
        
    async def start_real_time_updates(self):
        """Main loop for dashboard updates"""
        while True:
            try:
                # Fetch new reviews since last update
                last_update = await self.redis_cache.get('last_update_time')
                new_reviews = await self._fetch_new_reviews(last_update)
                
                if new_reviews:
                    # Process and analyze new reviews
                    analyzed = await self.sentiment_analyzer.analyze_review_batch(
                        new_reviews
                    )
                    
                    # Update database tables for Superset
                    await self._update_dashboard_tables(analyzed)
                    
                    # Invalidate relevant caches
                    await self._invalidate_dashboard_caches()
                    
                    # Trigger dashboard refresh
                    await self.superset_client.refresh_dashboards([
                        'tourism-overview',
                        'sentiment-analysis',
                        'location-insights'
                    ])
                    
                    # Send alerts if needed
                    await self._check_and_send_alerts(analyzed)
                    
                    # Update last processed time
                    await self.redis_cache.set(
                        'last_update_time', 
                        datetime.now().isoformat()
                    )
                
                # Wait for next update cycle
                await asyncio.sleep(self.update_interval)
                
            except Exception as e:
                logging.error(f"Dashboard update failed: {e}")
                await self._handle_update_error(e)
    
    async def _update_dashboard_tables(self, analyzed_data):
        """Update PostgreSQL tables that feed Superset dashboards"""
        async with self.postgres.transaction() as tx:
            # Update sentiment summary table
            await tx.execute("""
                INSERT INTO sentiment_summary 
                (location_id, date, avg_sentiment, review_count, 
                 top_positive_aspects, top_negative_aspects)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (location_id, date) 
                DO UPDATE SET
                    avg_sentiment = EXCLUDED.avg_sentiment,
                    review_count = EXCLUDED.review_count,
                    top_positive_aspects = EXCLUDED.top_positive_aspects,
                    top_negative_aspects = EXCLUDED.top_negative_aspects
            """, *self._prepare_summary_data(analyzed_data))
            
            # Update temporal trends
            await self._update_temporal_trends(tx, analyzed_data)
            
            # Update geographical heatmap data
            await self._update_geo_heatmap(tx, analyzed_data)
    
    async def _check_and_send_alerts(self, analyzed_data):
        """Send alerts for significant negative sentiment changes"""
        for location, metrics in analyzed_data['by_location'].items():
            avg_sentiment = np.mean(metrics['sentiments'])
            
            # Check if sentiment dropped significantly
            historical_avg = await self._get_historical_average(location)
            if historical_avg - avg_sentiment > 0.5:  # Significant drop
                await self._send_alert({
                    'type': 'sentiment_drop',
                    'location': location,
                    'current_sentiment': avg_sentiment,
                    'historical_average': historical_avg,
                    'top_issues': self._extract_top_issues(metrics)
                })`,
        explanation: 'This real-time system processes new reviews every 15 minutes, updates the dashboard automatically, and sends alerts when sentiment drops significantly at any location, enabling rapid response to tourist concerns.'
      }
    ],
    testimonials: [
      {
        quote: "The sentiment analysis platform gave us unprecedented visibility into tourist experiences. We could finally see patterns we were missing and make data-driven decisions that improved satisfaction scores by nearly 20%.",
        author: "Sophie Dubois",
        role: "Tourism Director",
        company: "Normandy Tourism Board"
      }
    ]
  },

  {
    id: 'business-intelligence-platform',
    title: 'Strategic Decision Support System',
    client: 'ISOPROM',
    period: '2019',
    description: 'Developed a comprehensive BI platform for strategic decision-making, featuring predictive revenue calculations and automated reporting.',
    thumbnail: '/images/projects/business-intelligence-platform-thumb.png',
    companyLogo: companyLogos['ISOPROM'],
    longDescription: `Built a complete business intelligence solution that transformed raw data into actionable insights for executive decision-making. The platform revolutionized ISOPROM's strategic planning process by providing real-time visibility into business performance and predictive insights.

The system features custom ETL pipelines that process complex business data from 15+ disparate sources, sophisticated revenue prediction models using ensemble methods, and comprehensive decision-making models (CDM) that guide strategic choices. The automated reporting system delivers tailored insights to different stakeholder levels, from operational metrics to executive dashboards.

ISOPROM struggled with delayed decision-making due to manual data consolidation across departments. Our solution automated the entire data workflow, reduced report generation time from days to hours, and provided predictive analytics that helped executives anticipate market changes. The platform's success led to a 23% improvement in forecast accuracy and enabled data-driven decisions that increased operational efficiency across all business units.`,
    technologies: [
      'Python',
      'SQL',
      'Power BI',
      'Apache Airflow',
      'PostgreSQL',
      'Pandas',
      'NumPy',
      'Tableau',
      'Dask',
      'Prophet',
      'Plotly Dash',
      'Redis',
      'Docker'
    ],
    results: [
      'Automated strategic reporting processes saving 120 hours/month',
      'Improved revenue prediction accuracy by 23%',
      'Reduced decision-making time by 50%',
      'Streamlined data workflows from 15+ sources',
      'Real-time KPI monitoring for 50+ metrics',
      'Enabled predictive what-if scenario analysis'
    ],
    features: [
      'Custom ETL pipelines with data quality monitoring',
      'Predictive revenue modeling with confidence intervals',
      'Automated report generation for multiple stakeholder levels',
      'Strategic decision-making models (CDM) implementation',
      'Advanced sorting algorithms for priority-based analysis',
      'Real-time anomaly detection for business metrics',
      'Interactive what-if scenario modeling',
      'Role-based dashboard access control'
    ],
    challenges: 'Integrating disparate data sources and ensuring model accuracy for financial predictions.',
    category: 'data-viz',
    featured: false,
    demoUrl: null,
    githubUrl: null,
    impact: 'business',
    lessons: {
      keyInsights: [
        'Clear communication is crucial - centralized real-time communication transformed organizational workflows',
        'User-centric design dramatically improves adoption rates and stakeholder reception',
        'Data accessibility empowers decision-making - making BI accessible to non-technical users proved vital'
      ],
      wouldDoDifferently: [
        'Engage stakeholders earlier in development process for clearer requirements gathering',
        'Allocate additional resources to thorough documentation and structured user training',
        'Expand testing scenarios (unit, integration, and user acceptance testing) for greater robustness'
      ]
    },
    futureImprovements: [
      'Mobile accessibility: Develop mobile application or optimize responsiveness for field access',
      'Predictive analytics integration: Incorporate project deadline forecasting and workload balancing',
      'Automated alert systems: Implement proactive alerts based on performance thresholds',
      'IoT integration: Connect with sensors for real-time operational data'
    ],
    metrics: [
      {
        label: 'Report Generation Time',
        value: '2 hours',
        baseline: '3 days',
        change: -97,
        impact: 'Executives receive insights while data is still actionable'
      },
      {
        label: 'Forecast Accuracy',
        value: '91%',
        baseline: '74%',
        change: 23,
        impact: 'Better resource allocation and inventory management'
      },
      {
        label: 'Data Sources Integrated',
        value: '15+',
        baseline: '3',
        change: 400,
        impact: 'Comprehensive view across all business operations'
      },
      {
        label: 'Monthly Time Saved',
        value: '120 hours',
        baseline: '0 hours',
        change: 100,
        impact: 'Team focuses on analysis instead of data preparation'
      }
    ],
    codeExamples: [
      {
        title: 'Intelligent ETL Pipeline with Data Quality Monitoring',
        language: 'Python',
        description: 'Robust ETL system that handles multiple data sources with automatic quality checks and error recovery',
        code: `class IntelligentETLPipeline:
    """
    Advanced ETL pipeline with data quality monitoring,
    automatic error recovery, and performance optimization
    """
    def __init__(self, config):
        self.sources = self._initialize_sources(config['sources'])
        self.quality_monitor = DataQualityMonitor()
        self.error_handler = ErrorRecoveryHandler()
        self.performance_tracker = PerformanceTracker()
        
    @dag(
        schedule_interval='@hourly',
        catchup=False,
        tags=['etl', 'business-intelligence']
    )
    def business_intelligence_etl(self):
        """Main ETL DAG for business intelligence platform"""
        
        # Extract data from multiple sources in parallel
        extracted_data = []
        for source_name, source_config in self.sources.items():
            extract_task = PythonOperator(
                task_id=f'extract_{source_name}',
                python_callable=self._extract_with_monitoring,
                op_kwargs={'source': source_config, 'name': source_name}
            )
            extracted_data.append(extract_task)
        
        # Data quality checks
        quality_gate = BranchPythonOperator(
            task_id='quality_gate',
            python_callable=self._check_data_quality,
            provide_context=True
        )
        
        # Transform data with business rules
        transform_task = PythonOperator(
            task_id='transform_business_data',
            python_callable=self._transform_with_cdm,
            provide_context=True
        )
        
        # Load to data warehouse
        load_task = PythonOperator(
            task_id='load_to_warehouse',
            python_callable=self._load_with_validation,
            provide_context=True
        )
        
        # Update dashboards and send notifications
        update_dashboards = PythonOperator(
            task_id='update_bi_dashboards',
            python_callable=self._refresh_dashboards
        )
        
        # Define dependencies
        extracted_data >> quality_gate
        quality_gate >> transform_task >> load_task >> update_dashboards
    
    def _extract_with_monitoring(self, source, name):
        """Extract data with performance monitoring and error handling"""
        start_time = time.time()
        
        try:
            # Connect to source
            connector = self._get_connector(source['type'])
            
            # Extract data with incremental loading
            last_sync = self._get_last_sync_time(name)
            query = self._build_incremental_query(source['query'], last_sync)
            
            # Use Dask for large datasets
            if source.get('large_dataset', False):
                df = dd.read_sql_query(
                    query, 
                    connector.connection,
                    npartitions=4
                )
            else:
                df = pd.read_sql_query(query, connector.connection)
            
            # Track extraction metrics
            self.performance_tracker.record({
                'source': name,
                'rows': len(df),
                'duration': time.time() - start_time,
                'memory_usage': df.memory_usage(deep=True).sum()
            })
            
            return df
            
        except Exception as e:
            # Attempt recovery strategies
            recovery_result = self.error_handler.attempt_recovery(
                source, name, e
            )
            if recovery_result:
                return recovery_result
            else:
                raise AirflowException(f"ETL failed for {name}: {str(e)}")
    
    def _transform_with_cdm(self, **context):
        """Apply business transformations and CDM rules"""
        # Retrieve extracted data from XCom
        extracted_data = self._gather_extracted_data(context)
        
        # Apply business rules and calculations
        transformed = pd.DataFrame()
        
        # Revenue calculations with multiple scenarios
        transformed['revenue_actual'] = self._calculate_revenue(
            extracted_data, 'actual'
        )
        transformed['revenue_forecast'] = self._predict_revenue(
            extracted_data, horizon=90
        )
        transformed['revenue_optimistic'] = self._predict_revenue(
            extracted_data, horizon=90, scenario='optimistic'
        )
        transformed['revenue_pessimistic'] = self._predict_revenue(
            extracted_data, horizon=90, scenario='pessimistic'
        )
        
        # Apply CDM for strategic metrics
        transformed['strategic_score'] = self._apply_cdm_model(
            extracted_data
        )
        
        # Customer segmentation and lifetime value
        transformed['customer_segments'] = self._segment_customers(
            extracted_data
        )
        transformed['ltv_predictions'] = self._calculate_ltv(
            extracted_data
        )
        
        # Data quality metrics
        quality_metrics = self.quality_monitor.assess(transformed)
        context['task_instance'].xcom_push(
            key='quality_metrics', 
            value=quality_metrics
        )
        
        return transformed`,
        explanation: 'This ETL pipeline handles 15+ data sources with automatic quality monitoring, error recovery, and performance optimization. It uses Dask for large datasets and implements incremental loading to process only new data, significantly reducing processing time.'
      },
      {
        title: 'Revenue Prediction with Ensemble Methods',
        language: 'Python',
        description: 'Advanced revenue forecasting system using multiple models with confidence intervals',
        code: `class RevenuePredictor:
    """
    Ensemble revenue prediction system combining multiple
    forecasting methods for robust predictions
    """
    def __init__(self):
        self.models = {
            'prophet': Prophet(
                yearly_seasonality=True,
                weekly_seasonality=True,
                changepoint_prior_scale=0.05
            ),
            'arima': AutoARIMA(
                seasonal=True,
                m=12,
                suppress_warnings=True
            ),
            'xgboost': XGBRegressor(
                n_estimators=1000,
                learning_rate=0.01,
                max_depth=5
            ),
            'lstm': self._build_lstm_model()
        }
        self.ensemble_weights = None
        self.feature_engineer = FeatureEngineer()
        
    def predict_revenue(self, historical_data, horizon=90, scenario='base'):
        """Generate revenue predictions with confidence intervals"""
        # Feature engineering
        features = self.feature_engineer.create_features(
            historical_data,
            include_external=True
        )
        
        # Generate predictions from each model
        predictions = {}
        confidence_intervals = {}
        
        for model_name, model in self.models.items():
            if model_name in ['prophet', 'arima']:
                # Time series models
                pred, ci = self._predict_timeseries(
                    model, features, horizon, model_name
                )
            else:
                # ML models
                pred, ci = self._predict_ml(
                    model, features, horizon, model_name
                )
            
            # Apply scenario adjustments
            if scenario != 'base':
                pred = self._apply_scenario_adjustment(
                    pred, scenario, model_name
                )
            
            predictions[model_name] = pred
            confidence_intervals[model_name] = ci
        
        # Ensemble predictions using optimized weights
        final_prediction = self._ensemble_predictions(
            predictions, self.ensemble_weights
        )
        
        # Calculate ensemble confidence intervals
        final_ci = self._calculate_ensemble_ci(
            confidence_intervals, self.ensemble_weights
        )
        
        # Add business constraints
        final_prediction = self._apply_business_constraints(
            final_prediction, historical_data
        )
        
        return {
            'forecast': final_prediction,
            'confidence_intervals': final_ci,
            'model_contributions': self._calculate_contributions(
                predictions, final_prediction
            ),
            'features_importance': self._get_feature_importance()
        }
    
    def _predict_ml(self, model, features, horizon, model_name):
        """Generate predictions using ML models"""
        # Prepare features for ML models
        X_train, y_train = self._prepare_ml_features(features)
        
        # Train model with cross-validation
        cv_scores = cross_val_score(
            model, X_train, y_train, cv=5, 
            scoring='neg_mean_absolute_percentage_error'
        )
        
        model.fit(X_train, y_train)
        
        # Generate future features
        future_features = self._generate_future_features(
            features, horizon
        )
        
        # Make predictions
        predictions = model.predict(future_features)
        
        # Calculate prediction intervals using quantile regression
        lower_model = clone(model)
        upper_model = clone(model)
        
        lower_model.set_params(objective='quantile:0.1')
        upper_model.set_params(objective='quantile:0.9')
        
        lower_model.fit(X_train, y_train)
        upper_model.fit(X_train, y_train)
        
        ci_lower = lower_model.predict(future_features)
        ci_upper = upper_model.predict(future_features)
        
        return predictions, (ci_lower, ci_upper)
    
    def _apply_cdm_model(self, data):
        """Apply Comprehensive Decision Model for strategic scoring"""
        # Extract key business metrics
        metrics = {
            'revenue_growth': self._calculate_growth_rate(data['revenue']),
            'customer_retention': self._calculate_retention(data['customers']),
            'market_share': self._calculate_market_share(data),
            'operational_efficiency': self._calculate_efficiency(data),
            'innovation_index': self._calculate_innovation_score(data)
        }
        
        # Apply weighted scoring based on strategic priorities
        weights = {
            'revenue_growth': 0.3,
            'customer_retention': 0.25,
            'market_share': 0.2,
            'operational_efficiency': 0.15,
            'innovation_index': 0.1
        }
        
        strategic_score = sum(
            metrics[metric] * weight 
            for metric, weight in weights.items()
        )
        
        return {
            'score': strategic_score,
            'components': metrics,
            'recommendations': self._generate_recommendations(metrics)
        }`,
        explanation: 'This ensemble prediction system combines Prophet, ARIMA, XGBoost, and LSTM models to generate robust revenue forecasts with confidence intervals. It automatically adjusts for different business scenarios and provides explainable predictions that helped ISOPROM improve forecast accuracy by 23%.'
      }
    ],
    testimonials: [
      {
        quote: "The BI platform transformed our decision-making process. What used to take days now happens in hours, and the predictive insights have been remarkably accurate. It's become indispensable for our strategic planning.",
        author: "Michel Bernard",
        role: "Chief Strategy Officer",
        company: "ISOPROM"
      }
    ]
  }
];

// Helper function to get featured professional projects
export const getFeaturedProfessionalProjects = () => {
  return professionalProjects.filter(project => project.featured);
};

// Helper function to get projects by category
export const getProfessionalProjectsByCategory = (category) => {
  return professionalProjects.filter(project => project.category === category);
};

// Categories for professional projects
export const professionalProjectCategories = [
  { id: 'all', name: 'All Projects', count: professionalProjects.length },
  { id: 'ai', name: 'AI/ML', count: professionalProjects.filter(p => p.category === 'ai').length },
  { id: 'nlp', name: 'NLP', count: professionalProjects.filter(p => p.category === 'nlp').length },
  { id: 'mlops', name: 'MLOps', count: professionalProjects.filter(p => p.category === 'mlops').length },
  { id: 'data-viz', name: 'Data Viz', count: professionalProjects.filter(p => p.category === 'data-viz').length }
];
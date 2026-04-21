import type { ExamId } from './exams';

export type Faq = {
  q: string;
  a: string;
};

export type ExamDetail = {
  duration: string;       // 試験時間（例: "90分"）
  questionCount: number;  // 問題数
  passingScore: number;   // 合格スコア（1000点満点）
  fee: string;            // 受験料
  format: string;         // 出題形式
};

export type ExamContent = {
  examId: ExamId;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  targetAudience: string;
  prerequisites: string;
  studyOrder: string[];
  keyPoints: string[];
  faq: Faq[];
  nextExams: ExamId[];
  examDetail: ExamDetail;
};

export const EXAM_CONTENTS: Record<ExamId, ExamContent> = {
  'CLF-C02': {
    examId: 'CLF-C02',
    metaTitle: 'CLF-C02 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified Cloud Practitioner (CLF-C02) のオリジナル問題を無料で学習。クラウドの概念・セキュリティ・主要サービス・料金を4ドメイン別に網羅。初心者向け解説付き。',
    summary:
      'CLF-C02（AWS Certified Cloud Practitioner）は、AWSクラウドの基礎知識を問うFoundationalレベルの試験です。ITやクラウドの経験がなくても受験でき、AWSを業務で活用したい全職種の方に適しています。本サイトでは4つのドメインにわたるオリジナル問題を無料で学習でき、各問題に詳細な解説が付いています。',
    targetAudience:
      'AWS・クラウド未経験者、IT非エンジニア職（営業・マネージャー・企画職など）でAWSの基礎を習得したい方。',
    prerequisites: '特になし。IT・クラウドの経験がない方でも受験可能です。',
    studyOrder: [
      'Domain 1「クラウドの概念」でAWSの価値提案・設計原則を理解する',
      'Domain 2「セキュリティとコンプライアンス」でIAM・責任共有モデルを把握する',
      'Domain 3「クラウドテクノロジーとサービス」でEC2・S3・RDSなど主要サービスを一通り覚える',
      'Domain 4「請求・料金・サポート」でコスト管理ツールとサポートプランを理解する',
      '模擬試験モードで時間を測りながら総仕上げをする',
    ],
    keyPoints: [
      'Domain 1: クラウドの6つの利点（弾力性・従量課金など）とAWS Well-Architectedフレームワークの柱が頻出。',
      'Domain 2: 責任共有モデル（AWSの責任 vs ユーザーの責任）の境界線を正確に覚えること。IAMのポリシー・ロール・ユーザーの違いも重要。',
      'Domain 3: 全サービスを深く理解する必要はなく「どのサービスが何をするか」を広く浅く把握するのがコツ。S3・EC2・RDS・Lambda・CloudFrontは必須。',
      'Domain 4: 料金モデル（オンデマンド・リザーブド・スポット）の特徴と使い分けを整理する。Cost ExplorerとBudgetsの違いも押さえておく。',
    ],
    faq: [
      {
        q: 'CLF-C02はIT未経験でも合格できますか？',
        a: 'はい、合格できます。Foundationalレベルのため技術的な深さは問われません。AWSの概念・主要サービスの役割・セキュリティの基本を理解すれば十分です。',
      },
      {
        q: '合格に必要な学習時間の目安は？',
        a: 'IT経験者で20〜40時間、未経験者で40〜80時間が目安です。本サイトの100問を繰り返し解きながら解説を読み込むことで効率よく対策できます。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '700点（1000点満点）が合格ラインです。65問出題され、スコアは100〜1000点のスケールドスコアで換算されます。',
      },
      {
        q: 'CLF-C02の次に受けるべき試験は？',
        a: 'AWSの技術領域を深めるならSAA-C03（ソリューションアーキテクト）がおすすめです。AI・機械学習に興味があればAIF-C01も入門しやすいです。',
      },
      {
        q: '模擬試験モードと分野別モードのどちらから始めるべきですか？',
        a: '最初は分野別モードで各ドメインを集中的に学習し、理解が深まったら模擬試験モードで本番形式に慣れるのが効果的です。',
      },
    ],
    nextExams: ['SAA-C03', 'AIF-C01'],
    examDetail: {
      duration: '90分',
      questionCount: 65,
      passingScore: 700,
      fee: '100 USD',
      format: '選択式・複数選択式',
    },
  },

  'SAA-C03': {
    examId: 'SAA-C03',
    metaTitle: 'SAA-C03 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified Solutions Architect – Associate (SAA-C03) のオリジナル問題を無料で学習。セキュア・高可用・高パフォーマンス・コスト最適化の4ドメインを網羅。解説付き。',
    summary:
      'SAA-C03（AWS Certified Solutions Architect – Associate）は、AWSでのシステム設計能力を問うAssociateレベルの試験です。高可用性・セキュリティ・コスト効率を考慮したアーキテクチャの設計が求められます。AWS実務経験1年以上または同等の知識がある方を対象としており、AWSエンジニアの登竜門として最も人気のある資格です。',
    targetAudience:
      'AWSを実務で使用するインフラエンジニア・システムアーキテクト。CLF-C02取得後にステップアップしたい方にも適しています。',
    prerequisites:
      'AWSの基本サービス（EC2・S3・RDS・VPC）の概要知識。CLF-C02レベルの理解があると学習がスムーズです。',
    studyOrder: [
      'Domain 1「セキュアなアーキテクチャの設計」でVPC・IAM・暗号化の基礎を固める',
      'Domain 2「弾力性の高いアーキテクチャの設計」でAuto Scaling・ELB・Multi-AZを理解する',
      'Domain 3「高パフォーマンスなアーキテクチャの設計」でキャッシュ・データベース選択・コンピューティング最適化を学ぶ',
      'Domain 4「コスト最適化されたアーキテクチャの設計」でストレージ・コンピューティングの料金モデルを整理する',
      '模擬試験モードで65問通しで解き、弱点ドメインを重点的に復習する',
    ],
    keyPoints: [
      'Domain 1: VPCのサブネット・セキュリティグループ・NACLの違い、IAMロールとポリシーの設計パターンが頻出。',
      'Domain 2: ELB（ALB/NLB/CLB）の使い分け、Auto ScalingのスケーリングポリシーとRDSのMulti-AZ・リードレプリカの違いを整理する。',
      'Domain 3: ElastiCache（Redis vs Memcached）の選択基準、DynamoDB vs RDSの使い分け、CloudFrontによるレイテンシ改善が頻出。',
      'Domain 4: S3のストレージクラス（Standard・IA・Glacier）の使い分け、EC2のリザーブドインスタンス・スポットインスタンスの適切な活用場面を理解する。',
    ],
    faq: [
      {
        q: 'SAA-C03の難易度はCLF-C02と比べてどのくらい違いますか？',
        a: 'CLF-C02より大幅に難しくなります。サービスの概要だけでなく、具体的なアーキテクチャ設計の判断力が問われます。「なぜそのサービスを選ぶか」という理由を理解することが重要です。',
      },
      {
        q: '合格に必要な学習時間の目安は？',
        a: 'AWS実務経験者で40〜80時間、未経験者で80〜150時間が目安です。ハンズオンと問題演習を組み合わせた学習が効果的です。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '720点（1000点満点）が合格ラインです。65問出題されます。',
      },
      {
        q: 'VPCの問題が苦手なのですが、どう対策すればよいですか？',
        a: 'VPCはSAA-C03で最も頻出のトピックです。パブリック・プライベートサブネットの設計、インターネットゲートウェイ・NATゲートウェイの役割、セキュリティグループとNACLの違いを図で整理することをおすすめします。',
      },
      {
        q: 'SAA-C03の次に受けるべき試験は何ですか？',
        a: '開発よりならDVA-C02（Developer）、運用よりならSOA-C02（SysOps）、データ基盤ならDEA-C01（Data Engineer）がおすすめです。上位のProfessionalレベルはSAP-C02があります。',
      },
    ],
    nextExams: ['DVA-C02', 'SOA-C02'],
    examDetail: {
      duration: '130分',
      questionCount: 65,
      passingScore: 720,
      fee: '150 USD',
      format: '選択式・複数選択式',
    },
  },

  'MLA-C01': {
    examId: 'MLA-C01',
    metaTitle: 'MLA-C01 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified Machine Learning Engineer – Associate (MLA-C01) のオリジナル問題を無料で学習。SageMakerを中心としたデータ・モデル開発・デプロイ・監視の4ドメインを解説付きで学習。',
    summary:
      'MLA-C01（AWS Certified Machine Learning Engineer – Associate）は、AWSでMLシステムを実装・運用するエンジニアを対象としたAssociateレベルの試験です。SageMakerを中心としたML基盤の構築から、モデルのデプロイ・監視まで幅広い知識が問われます。ML実装の実務経験がある方や、AIF-C01取得後により深い技術知識を身に付けたい方に適しています。',
    targetAudience:
      'AWSでML/AIシステムを実装・運用するMLエンジニア・データサイエンティスト。AIF-C01取得者でAWS MLサービスを深く学びたい方にもおすすめです。',
    prerequisites:
      'PythonとML基礎知識（教師あり学習・モデル評価など）、SAA-C03レベルのAWS知識があると学習がスムーズです。',
    studyOrder: [
      'Domain 1「ML向けデータエンジニアリング」でデータ収集・前処理・特徴量エンジニアリングを理解する',
      'Domain 2「MLモデル開発」でSageMakerの組み込みアルゴリズム・ハイパーパラメータチューニングを学ぶ',
      'Domain 3「MLモデルのデプロイと運用化」でエンドポイント・バッチ変換・MLOpsパターンを整理する',
      'Domain 4「MLソリューションの監視とメンテナンス」でモデルドリフト検出・再学習パイプラインを把握する',
      '模擬試験モードで通しで解き、SageMakerの各機能の使い分けを確認する',
    ],
    keyPoints: [
      'Domain 1: S3・Glue・Kinesis・Feature Storeを使ったデータパイプラインの設計パターンと、データの前処理・バリデーション手法が頻出。',
      'Domain 2: SageMakerの組み込みアルゴリズム（XGBoost・BlazingText等）の特性とAutoMLの使い所、ハイパーパラメータ最適化（HPO）の仕組みを理解する。',
      'Domain 3: リアルタイム推論エンドポイントとバッチ変換の使い分け、A/Bテスト・カナリアデプロイの実装パターンが問われる。',
      'Domain 4: Model Monitor・Clarifyを使ったデータドリフト・バイアス検出の手法、CloudWatchとの連携による監視設計を押さえる。',
    ],
    faq: [
      {
        q: 'MLA-C01はAIF-C01と何が違いますか？',
        a: 'AIF-C01はAI・MLの概念を広く浅く問う入門試験ですが、MLA-C01はAWSでMLを実装するための技術的な深さが求められます。SageMakerの具体的な使い方や、MLOpsの設計パターンが中心です。',
      },
      {
        q: 'SageMakerを触ったことがないと難しいですか？',
        a: 'ハンズオン経験があると有利ですが、必須ではありません。SageMakerの各機能（Training Job・Endpoint・Pipeline等）の役割と使い分けを理解することが合格の鍵です。',
      },
      {
        q: '合格に必要な学習時間の目安は？',
        a: 'ML実務経験者で60〜100時間が目安です。AWS MLサービスとMLOpsの概念の両方を押さえる必要があるため、計画的な学習が重要です。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '720点（1000点満点）が合格ラインです。65問出題されます。',
      },
      {
        q: '前提として取るべき資格はありますか？',
        a: '必須ではありませんが、SAA-C03でAWSの基礎を固めてからMLA-C01に臨むと、データ基盤やストレージの問題がスムーズに理解できます。',
      },
    ],
    nextExams: [],
    examDetail: {
      duration: '130分',
      questionCount: 65,
      passingScore: 720,
      fee: '150 USD',
      format: '選択式・複数選択式',
    },
  },

  'AIF-C01': {
    examId: 'AIF-C01',
    metaTitle: 'AIF-C01 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified AI Practitioner (AIF-C01) のオリジナル問題を無料で学習。AI・ML基礎から生成AI・Amazon Bedrock・責任あるAIまで5ドメインを解説付きで対策。',
    summary:
      'AIF-C01（AWS Certified AI Practitioner）は、AI・機械学習・生成AIの基礎知識を問うFoundationalレベルの試験です。技術的な実装経験は不要で、AIサービスの概念と活用方法を理解していれば受験できます。Amazon Bedrockをはじめとする生成AIサービスが重点的に出題されるため、生成AIに興味があるすべての職種の方に適しています。',
    targetAudience:
      'AI・生成AIに興味があるビジネスパーソン・ITエンジニア・非技術職。CLF-C02取得後にAI領域を学びたい方にもおすすめです。',
    prerequisites:
      'IT・AIの実務経験は不要。CLF-C02レベルのAWS基礎知識があると理解しやすいですが、なくても受験可能です。',
    studyOrder: [
      'Domain 1「AIとMLの基礎」で教師あり・なし学習の違いとMLライフサイクルを理解する',
      'Domain 2「生成AIの基礎」でLLM・トークン・プロンプトエンジニアリングの概念を把握する',
      'Domain 3「基盤モデルのアプリケーション」でAmazon BedrockのRAG・エージェント機能を学ぶ',
      'Domain 4「責任あるAIのガイドライン」でバイアス・公平性・透明性の考え方を整理する',
      'Domain 5「AIソリューションのセキュリティ・コンプライアンス・ガバナンス」でIAM・データプライバシーを確認する',
    ],
    keyPoints: [
      'Domain 1: 教師あり・教師なし・強化学習の違いと、分類・回帰・クラスタリングの使い分けが頻出。SageMakerの役割も概要レベルで押さえる。',
      'Domain 2: トークン・埋め込み（Embedding）・プロンプトエンジニアリングの基本概念を理解する。ファインチューニングとRAGの違いも重要。',
      'Domain 3: Amazon Bedrockの基盤モデル選択・Knowledge Bases（RAG）・Agentsの仕組みが頻出。ユースケース別のモデル選択基準を整理する。',
      'Domain 4: AIバイアスの種類（データバイアス・アルゴリズムバイアス）とAWS Responsible AIポリシーの6原則を覚える。',
      'Domain 5: モデルの脆弱性（プロンプトインジェクション等）とデータプライバシー保護の手法、IAMによるアクセス制御のパターンを把握する。',
    ],
    faq: [
      {
        q: 'AIF-C01はプログラミング未経験でも合格できますか？',
        a: 'はい、合格できます。コードを書く問題は出題されません。AIサービスの概念・用途・倫理的な利用方針を理解することが中心です。',
      },
      {
        q: 'CLF-C02とAIF-C01はどちらを先に受けるべきですか？',
        a: 'AWSが初めてならCLF-C02が先をおすすめします。ただし、AI・生成AIに特化して学びたい場合はAIF-C01から始めても問題ありません。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '700点（1000点満点）が合格ラインです。65問出題されます。',
      },
      {
        q: 'Amazon Bedrockの知識は必須ですか？',
        a: 'はい、AIF-C01ではAmazon Bedrockの知識が重要です。基盤モデルの選択・RAG・Agentsの仕組みと使い分けを中心に学習することをおすすめします。',
      },
      {
        q: 'AIF-C01取得後の次のステップは？',
        a: 'MLの実装技術を深めたい場合はMLA-C01（Machine Learning Engineer）が自然なステップアップです。AWSの基盤知識を広げたい場合はSAA-C03もおすすめです。',
      },
    ],
    nextExams: ['MLA-C01'],
    examDetail: {
      duration: '90分',
      questionCount: 65,
      passingScore: 700,
      fee: '100 USD',
      format: '選択式・複数選択式',
    },
  },

  'DVA-C02': {
    examId: 'DVA-C02',
    metaTitle: 'DVA-C02 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified Developer – Associate (DVA-C02) のオリジナル問題を無料で学習。Lambda・API Gateway・DynamoDB・CI/CDパイプラインなど開発者向け4ドメインを解説付きで対策。',
    summary:
      'DVA-C02（AWS Certified Developer – Associate）は、AWSでアプリケーション開発・デプロイを行う開発者を対象としたAssociateレベルの試験です。サーバーレスアーキテクチャ（Lambda・API Gateway・DynamoDB）とCI/CDパイプラインが頻出で、AWSを使った開発の実務に直結した知識が問われます。SAA-C03の後に受験するのが一般的なルートです。',
    targetAudience:
      'AWSでアプリケーション開発を行うバックエンド・フルスタックエンジニア。SAA-C03取得後に開発領域を深めたい方に適しています。',
    prerequisites:
      'プログラミング経験（Python・Node.js等）とSAA-C03レベルのAWS基礎知識。',
    studyOrder: [
      'Domain 1「AWSサービスによる開発」でLambda・API Gateway・DynamoDB・SQS/SNSのコードレベルの使い方を理解する',
      'Domain 2「セキュリティ」でCognito・KMS・Secrets Manager・IAMロールの開発での活用方法を学ぶ',
      'Domain 3「デプロイ」でCodePipeline・CodeBuild・CodeDeploy・SAM・CDKの仕組みと使い分けを整理する',
      'Domain 4「トラブルシューティングと最適化」でX-Ray・CloudWatchのデバッグ活用とパフォーマンスチューニングを学ぶ',
      '模擬試験モードでシナリオ形式の問題に慣れ、サーバーレス設計の判断力を養う',
    ],
    keyPoints: [
      'Domain 1: LambdaのコールドスタートとプロビジョニングされたConcurrencyの使い分け、DynamoDBのパーティションキー設計・GSI・LSIの使い所が頻出。',
      'Domain 2: Cognitoのユーザープール・IDプールの違い、KMSによるエンベロープ暗号化の仕組み、Secrets ManagerとParameter Storeの使い分けを整理する。',
      'Domain 3: CodeDeployのデプロイ設定（Blue/Green・カナリア）の違い、SAMテンプレートの基本構文、CDKとCloudFormationの関係を理解する。',
      'Domain 4: X-RayのトレースIDと分散トレーシングの仕組み、CloudWatch Logsのインサイト活用、Lambdaのリザーブドコンカレンシーによるスロットリング制御を押さえる。',
    ],
    faq: [
      {
        q: 'SAA-C03なしでDVA-C02を受験できますか？',
        a: '受験自体は可能です。ただし、DVA-C02はAWSの基礎知識を前提とした問題が多いため、SAA-C03またはそれと同等の知識があると学習効率が上がります。',
      },
      {
        q: 'サーバーレス（Lambda）の問題が多いですか？',
        a: 'はい、Lambda・API Gateway・DynamoDBを中心としたサーバーレスアーキテクチャの問題が全体の30〜40%程度を占めます。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '720点（1000点満点）が合格ラインです。65問出題されます。',
      },
      {
        q: 'CI/CDの問題はコードを書く問題ですか？',
        a: 'いいえ、コードを書く問題は出題されません。CodePipeline・CodeBuild・CodeDeployの設定や使い分けに関する選択問題です。',
      },
      {
        q: 'DynamoDBの設計問題が苦手です。どう対策すればよいですか？',
        a: 'パーティションキー・ソートキーの設計原則、GSI（グローバルセカンダリインデックス）とLSI（ローカルセカンダリインデックス）の用途の違いを中心に整理してください。アクセスパターンからテーブル設計を考える練習が有効です。',
      },
    ],
    nextExams: [],
    examDetail: {
      duration: '130分',
      questionCount: 65,
      passingScore: 720,
      fee: '150 USD',
      format: '選択式・複数選択式',
    },
  },

  'SOA-C02': {
    examId: 'SOA-C02',
    metaTitle: 'SOA-C02 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified SysOps Administrator – Associate (SOA-C02) のオリジナル問題を無料で学習。監視・運用・デプロイ・セキュリティ・ネットワーキングなど6ドメインを解説付きで対策。',
    summary:
      'SOA-C02（AWS Certified SysOps Administrator – Associate）は、AWSインフラの運用・管理を担当するシステム管理者を対象としたAssociateレベルの試験です。監視・ロギング・障害対応・自動化・セキュリティコンプライアンスと幅広い運用知識が問われます。6つのドメインから構成されており、SAA-C03と並んで実務直結度の高い資格です。',
    targetAudience:
      'AWSインフラの運用・保守を担当するSREやインフラエンジニア。SAA-C03取得後に運用領域を深めたい方に適しています。',
    prerequisites:
      'SAA-C03レベルのAWS基礎知識。Linuxの基本操作やインフラ運用の実務経験があると有利です。',
    studyOrder: [
      'Domain 1「モニタリング・ロギング・修復」でCloudWatch・Systems Managerの運用活用を理解する',
      'Domain 2「信頼性とビジネス継続性」でMulti-AZ・バックアップ・DR設計のパターンを学ぶ',
      'Domain 3「デプロイ・プロビジョニング・自動化」でCloudFormation・Elastic Beanstalkの運用方法を整理する',
      'Domain 4「セキュリティとコンプライアンス」でConfig・GuardDuty・Inspectorの役割を把握する',
      'Domain 5「ネットワーキングとコンテンツ配信」でVPC設計・Transit Gateway・CloudFrontを理解する',
      'Domain 6「コストとパフォーマンスの最適化」でCost ExplorerとTrusted Advisorの活用方法を確認する',
    ],
    keyPoints: [
      'Domain 1: CloudWatch MetricsとLogsの違い、Systems Manager（SSM）のSession Manager・Patch Managerの使い方が頻出。EventBridgeを使った自動修復パターンも重要。',
      'Domain 2: RDSのMulti-AZとリードレプリカの違い（可用性 vs パフォーマンス）、Route 53のヘルスチェックを使ったフェイルオーバー設計を整理する。',
      'Domain 3: CloudFormationのスタック更新とロールバック、ネストされたスタックの使い方、Auto Scalingのスケーリングポリシーの種類（ターゲット追跡・ステップ）を理解する。',
      'Domain 4: AWS Config Rulesによるコンプライアンス評価、GuardDuty・Inspector・Security Hubの役割の違いを整理する。責任共有モデルの運用側への適用も問われる。',
      'Domain 5: VPC Peering・Transit Gateway・PrivateLinkの使い分け、NATゲートウェイとNATインスタンスの違いを理解する。',
      'Domain 6: リザーブドインスタンス・Savings Plans・スポットインスタンスの使い分け、Cost Anomaly Detectionの活用方法を押さえる。',
    ],
    faq: [
      {
        q: 'SOA-C02はSAA-C03より難しいですか？',
        a: '難易度はほぼ同等ですが、試験の範囲が「運用」に特化しているため、運用経験があるとSAA-C03より取り組みやすく感じる方もいます。ただし6ドメインと範囲が広いため対策量は多くなります。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '720点（1000点満点）が合格ラインです。65問の選択問題と複数回答問題で構成されます。',
      },
      {
        q: 'Systems Managerの問題が多いですか？',
        a: 'はい、SOA-C02ではSystems Manager（SSM）が最頻出トピックの一つです。Parameter Store・Session Manager・Patch Manager・Run Commandの使い方を整理してください。',
      },
      {
        q: 'CloudFormationとTerraformの違いは出題されますか？',
        a: 'AWS試験ではAWSサービスのみが対象のためTerraformは出題されません。CloudFormationの構造（テンプレート・スタック・チェンジセット）とデプロイパターンを理解してください。',
      },
      {
        q: '合格に必要な学習時間の目安は？',
        a: 'AWS実務経験者で50〜80時間が目安です。6ドメインと範囲が広いため、分野別に集中学習してから模擬試験で総合力を確認するのが効率的です。',
      },
    ],
    nextExams: [],
    examDetail: {
      duration: '130分',
      questionCount: 65,
      passingScore: 720,
      fee: '150 USD',
      format: '選択式・複数選択式',
    },
  },

  'DEA-C01': {
    examId: 'DEA-C01',
    metaTitle: 'DEA-C01 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription:
      'AWS Certified Data Engineer – Associate (DEA-C01) のオリジナル問題を無料で学習。Glue・Kinesis・Redshift・Lake Formationなどデータ基盤の4ドメインを解説付きで対策。',
    summary:
      'DEA-C01（AWS Certified Data Engineer – Associate）は、AWSでデータパイプラインの設計・構築・運用を担うデータエンジニアを対象としたAssociateレベルの試験です。データの取り込み・変換・保管から、セキュリティとガバナンスまで幅広いデータ基盤の知識が問われます。Glue・Kinesis・Redshift・Lake Formationが頻出サービスです。',
    targetAudience:
      'AWSでデータパイプラインやデータウェアハウスを構築・運用するデータエンジニア・データアーキテクト。SAA-C03取得後にデータ領域を深めたい方に適しています。',
    prerequisites:
      'SAA-C03レベルのAWS基礎知識。SQLとデータ処理（ETL）の基礎知識があると有利です。',
    studyOrder: [
      'Domain 1「データの取り込みと変換」でGlue・Kinesis・MSKを使ったデータ収集・ETL設計を理解する',
      'Domain 2「データストア管理」でS3・Redshift・DynamoDB・RDS・Lake Formationの使い分けを整理する',
      'Domain 3「データ運用とサポート」でAthena・EMRとCloudWatchを使ったデータ品質管理を学ぶ',
      'Domain 4「データセキュリティとガバナンス」でIAM・KMS・Macieによるデータ保護を把握する',
      '模擬試験モードでシナリオ形式のデータアーキテクチャ問題に慣れる',
    ],
    keyPoints: [
      'Domain 1: Kinesis Data Streams・Kinesis Firehose・MSKのリアルタイム処理の違い、AWS GlueのETLジョブとGlue Crawlerの使い分けが頻出。データ形式（Parquet・ORC・Avro）の特性も重要。',
      'Domain 2: S3のストレージクラスとライフサイクルポリシー、Redshiftのノード種別・分散キー・ソートキーの設計、Lake FormationによるDelta Lakeのアクセス制御を理解する。',
      'Domain 3: AthenaのパーティションプルーニングとS3のデータ配置最適化、EMRのクラスタ設定とスポットインスタンス活用、データ品質チェックのベストプラクティスを押さえる。',
      'Domain 4: Lake Formationの列レベル・行レベルセキュリティ、KMSによる保管時暗号化と転送時暗号化の違い、Macieを使ったS3の機密データ検出を理解する。',
    ],
    faq: [
      {
        q: 'DEA-C01はSAA-C03とどう違いますか？',
        a: 'SAA-C03はAWS全般のアーキテクチャ設計を問いますが、DEA-C01はデータ基盤・データパイプラインに特化した深い知識が問われます。データエンジニアリング領域に集中した資格です。',
      },
      {
        q: 'SQLの知識は必要ですか？',
        a: 'SQLの深い知識は必要ありませんが、AthenaやRedshiftのクエリ最適化（パーティション・ソートキー）の概念を理解するためにSQL基礎知識があると有利です。',
      },
      {
        q: '試験の合格ラインは何点ですか？',
        a: '720点（1000点満点）が合格ラインです。65問出題されます。',
      },
      {
        q: 'GlueとEMRはどちらがよく出題されますか？',
        a: '両方出題されますが、GlueはDEA-C01で最頻出サービスの一つです。Glue ETLジョブ・Crawler・カタログの仕組みと、EMRとの使い分け（マネージドETL vs カスタムHadoop処理）を理解してください。',
      },
      {
        q: 'Lake Formationの問題はどのくらい出ますか？',
        a: 'データガバナンスの観点からDomain 2・4で出題されます。S3上のデータへのアクセス制御をLake Formationで一元管理する仕組みと、IAMとの役割分担を整理しておくと対応できます。',
      },
    ],
    nextExams: [],
    examDetail: {
      duration: '130分',
      questionCount: 65,
      passingScore: 720,
      fee: '150 USD',
      format: '選択式・複数選択式',
    },
  },

  // Coming Soon（問題準備中）
  'SAP-C02': {
    examId: 'SAP-C02',
    metaTitle: 'SAP-C02 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription: 'AWS Certified Solutions Architect – Professional (SAP-C02) の練習問題を準備中です。',
    summary: '準備中です。',
    targetAudience: '準備中です。',
    prerequisites: '準備中です。',
    studyOrder: [],
    keyPoints: [],
    faq: [],
    nextExams: [],
    examDetail: { duration: '170分', questionCount: 75, passingScore: 750, fee: '300 USD', format: '選択式・複数選択式' },
  },
  'DOP-C02': {
    examId: 'DOP-C02',
    metaTitle: 'DOP-C02 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription: 'AWS Certified DevOps Engineer – Professional (DOP-C02) の練習問題を準備中です。',
    summary: '準備中です。',
    targetAudience: '準備中です。',
    prerequisites: '準備中です。',
    studyOrder: [],
    keyPoints: [],
    faq: [],
    nextExams: [],
    examDetail: { duration: '180分', questionCount: 75, passingScore: 750, fee: '300 USD', format: '選択式・複数選択式' },
  },
  'ANS-C01': {
    examId: 'ANS-C01',
    metaTitle: 'ANS-C01 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription: 'AWS Certified Advanced Networking – Specialty (ANS-C01) の練習問題を準備中です。',
    summary: '準備中です。',
    targetAudience: '準備中です。',
    prerequisites: '準備中です。',
    studyOrder: [],
    keyPoints: [],
    faq: [],
    nextExams: [],
    examDetail: { duration: '170分', questionCount: 65, passingScore: 750, fee: '300 USD', format: '選択式・複数選択式' },
  },
  'MLS-C01': {
    examId: 'MLS-C01',
    metaTitle: 'MLS-C01 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription: 'AWS Certified Machine Learning – Specialty (MLS-C01) の練習問題を準備中です。',
    summary: '準備中です。',
    targetAudience: '準備中です。',
    prerequisites: '準備中です。',
    studyOrder: [],
    keyPoints: [],
    faq: [],
    nextExams: [],
    examDetail: { duration: '180分', questionCount: 65, passingScore: 750, fee: '300 USD', format: '選択式・複数選択式' },
  },
  'SCS-C02': {
    examId: 'SCS-C02',
    metaTitle: 'SCS-C02 練習問題・模擬試験・解説 | AWS無料試験問題集',
    metaDescription: 'AWS Certified Security – Specialty (SCS-C02) の練習問題を準備中です。',
    summary: '準備中です。',
    targetAudience: '準備中です。',
    prerequisites: '準備中です。',
    studyOrder: [],
    keyPoints: [],
    faq: [],
    nextExams: [],
    examDetail: { duration: '170分', questionCount: 65, passingScore: 750, fee: '300 USD', format: '選択式・複数選択式' },
  },
};

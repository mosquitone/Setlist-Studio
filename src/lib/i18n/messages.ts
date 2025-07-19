/**
 * i18n Message Management System
 * メッセージの多言語管理
 */

export type Language = 'ja' | 'en';

export interface Messages {
  // 認証関連
  auth: {
    loginRequired: string;
    authenticationExpired: string;
    serverError: string;
    userAlreadyExists: string;
    invalidCredentials: string;
    emailSent: string;
    passwordResetRequested: string;
    passwordResetSuccess: string;
    invalidResetToken: string;
    emailVerified: string;
    invalidVerificationToken: string;
    emailChangedSuccess: string;
    invalidChangeToken: string;
    passwordChangeSuccess: string;
    currentPasswordIncorrect: string;
    emailAlreadyVerified: string;
    authRequired: string;
    userNotFound: string;
    rateLimitExceeded: string;
    checkingLoginStatus: string;
    redirectingToLogin: string;

    // ログイン・登録フォーム
    login: string;
    logout: string;
    register: string;
    email: string;
    password: string;
    username: string;
    rememberMe: string;
    loginButton: string;
    registerButton: string;
    loggingIn: string;
    registering: string;
    or: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePassword: string;
    resetPassword: string;
    forgotPassword: string;
    sendResetEmail: string;
    passwordResetTitle: string;
    passwordResetDescription: string;
    resendPasswordReset: string;
    resendAvailableIn: string;
    resendCount: string;
    emailNotFound: string;
    resetEmailHelp: string;
    checkSpamFolder: string;
    mayTakeMinutes: string;
    canResendAbove: string;
    backToLogin: string;
    checkYourEmail: string;
    // メール認証ページ
    emailVerificationTitle: string;
    emailVerificationDescription: string;
    accountCreated: string;
    accountCreatedDescription: string;
    emailVerificationPending: string;
    emailVerificationPendingDescription: string;
    loginAvailable: string;
    loginAvailableDescription: string;
    emailConfirmationRequest: string;
    verificationEmailSent: string;
    clickVerificationLink: string;
    emailNotInSpam: string;
    resendVerificationEmail: string;
    resendAvailable: string;
    resendCount2: string;
    emailNotReceived: string;
    checkSpamFolder2: string;
    mayTakeMinutes2: string;
    checkEmailTypo: string;
    verifyEmail: string;
    resendVerification: string;
    alreadyHaveAccount: string;
    dontHaveAccount: string;
    loginToManageSetlists: string;
    createAccountToStart: string;
    // 利用規約・プライバシー
    terms: string;
    privacy: string;
    and: string;
    agree: string;
    // プロフィール関連（auth固有のみ）
    profile: string;
    noData: string;
    createdAt: string;
    accountId: string;
  };

  // エラーメッセージ
  errors: {
    serverError: string;
    validationError: string;
    networkError: string;
    unknownError: string;
    setlistNotFound: string;
    songNotFound: string;
    unauthorized: string;
    forbidden: string;
    somethingWentWrong: string;
  };

  // ページタイトル・説明
  pages: {
    home: {
      title: string;
      description: string;
      subtitle: string;
      heroTitle: string;
      heroSubtitle: string;
      sampleSetlists: {
        title: string;
        description: string;
        blackTheme: string;
        whiteTheme: string;
        blackThemeAlt: string;
        whiteThemeAlt: string;
        footer: string;
      };
      dashboard: {
        title: string;
        loading: string;
        empty: {
          title: string;
          description: string;
          createButton: string;
        };
        public: string;
        private: string;
        white: string;
        black: string;
        songsCount: string;
        edit: string;
        delete: {
          title: string;
          itemType: string;
        };
      };
    };
    login: {
      title: string;
      description: string;
    };
    register: {
      title: string;
      description: string;
    };
    setlists: {
      title: string;
      description: string;
      empty: string;
      createFirst: string;
    };
    songs: {
      title: string;
      description: string;
      empty: string;
      createFirst: string;
    };
    profile: {
      title: string;
      description: string;
    };
    guide: {
      title: string;
      description: string;
      subtitle: string;
      aboutSection: {
        title: string;
        description1: string;
        description2: string;
        alertInfo: string;
      };
      featureComparison: {
        title: string;
        features: string;
        unregisteredUser: string;
        registeredUser: string;
        publicSetlistView: string;
        imageDownload: string;
        setlistShare: string;
        setlistManagement: string;
        songDatabase: string;
        publicitySettings: string;
        duplicateFunction: string;
        personalDashboard: string;
        profileManagement: string;
      };
      accountBenefits: {
        title: string;
        description: string;
        setlistCreation: {
          title: string;
          description: string;
        };
        songManagement: {
          title: string;
          description: string;
        };
        privateFeatures: {
          title: string;
          description: string;
        };
        signUpNow: string;
        signUpDescription: string;
      };
      publicUsage: {
        title: string;
        step1: {
          title: string;
          description: string;
        };
        step2: {
          title: string;
          description: string;
        };
        step3: {
          title: string;
          description: string;
        };
        step4: {
          title: string;
          description: string;
        };
      };
      pageDetails: {
        title: string;
        homePage: {
          title: string;
          unregisteredDescription: string;
          registeredDescription: string;
          feature1: string;
          feature2: string;
          feature3: string;
        };
        setlistDetail: {
          title: string;
          description: string;
          feature1: string;
          feature2: string;
          feature3: string;
          feature4: string;
          feature5: string;
          feature6: string;
        };
        songManagement: {
          title: string;
          description: string;
          feature1: string;
          feature2: string;
          feature3: string;
          feature4: string;
          feature5: string;
        };
        setlistCreation: {
          title: string;
          description: string;
          feature1: string;
          feature2: string;
          feature3: string;
          feature4: string;
          feature5: string;
          feature6: string;
          feature7: string;
        };
        profile: {
          title: string;
          description: string;
          feature1: string;
          feature2: string;
          feature3: string;
          feature4: string;
        };
      };
    };
    privacy: {
      title: string;
    };
    terms: {
      title: string;
    };
  };

  // 機能説明
  features: {
    title: string;
    setlistManagement: {
      title: string;
      description: string;
    };
    songLibrary: {
      title: string;
      description: string;
    };
    imageGeneration: {
      title: string;
      description: string;
    };
    sharing: {
      title: string;
      description: string;
    };
    themes: {
      title: string;
      description: string;
    };
    qrCode: {
      title: string;
      description: string;
    };
  };

  // 通知・メッセージ
  notifications: {
    setlistCreated: string;
    setlistUpdated: string;
    setlistDeleted: string;
    songCreated: string;
    songAdded: string;
    songUpdated: string;
    songDeleted: string;
    imageGenerated: string;
    copied: string;
    saved: string;
    profileUpdated: string;
    passwordChanged: string;
    emailSent: string;
    linkCopied: string;
    accountCreated: string;
  };

  // 確認メッセージ
  confirmations: {
    deleteSetlist: string;
    deleteSong: string;
    logout: string;
    unsavedChanges: string;
    makePublic: string;
    makePrivate: string;
  };

  // バリデーション
  validation: {
    required: string;
    emailInvalid: string;
    usernameInvalid: string;
    passwordTooShort: string;
    passwordsDoNotMatch: string;
    usernameTooShort: string;
    titleTooShort: string;
    titleTooLong: string;
    agreeToTerms: string;
  };

  footer: {
    contact: string;
  };

  // 共通のUI要素
  common: {
    back: string;
    submit: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    create: string;
    update: string;
    confirm: string;
    loading: string;
    success: string;
    error: string;
    wait: string;
    yes: string;
    no: string;
    song: string;
    newSong: string;
    editSong: string;
    deleteSong: string;
    songTitle: string;
    artist: string;
    key: string;
    tempo: string;
    duration: string;
    notes: string;
    addSong: string;
    removeSong: string;
    required: string;
    optional: string;
    pleaseEnter: string;
    pleaseSelect: string;
    invalid: string;
    tooShort: string;
    tooLong: string;
    draft: string;
    published: string;
    private: string;
    public: string;
    empty: string;
    noData: string;
    noResults: string;
    minutes: string;
    hours: string;
    days: string;
    weeks: string;
    months: string;
    years: string;
    ago: string;
    search: string;
    filter: string;
    sort: string;
    language: string;
    settings: string;
    help: string;
    about: string;
    contact: string;
    feedback: string;
    version: string;
    madeWith: string;
    setlist: string;
    editSetlist: string;
    deleteSetlist: string;
    setlistTitle: string;
    bandName: string;
    venue: string;
    eventDate: string;
    eventTime: string;
    songOrder: string;
    timing: string;
    appliedFilters: string;
    clearFilters: string;
    filterByArtist: string;
    filterByKey: string;
    downloadImage: string;
    shareSetlist: string;
    duplicateSetlist: string;
    duplicateSuccess: string;
    linkCopied: string;
    theme: string;
    basicBlack: string;
    basicWhite: string;
    deleteConfirmation: string;
    deleteWarning: string;
    logoOfficialSite: string;
    logoOfficialSiteTap: string;
    close: string;
    effectiveDate: string;
  };

  // セットリスト詳細ページ
  setlistDetail: {
    successMessage: string;
    actions: {
      download: string;
      share: string;
      duplicate: string;
      makePublic: string;
      makePrivate: string;
    };
    deleteDialog: {
      title: string;
      message: string;
      warning: string;
      cancel: string;
      delete: string;
      deleting: string;
    };
  };

  // セットリストフォーム
  setlistForm: {
    titles: {
      create: string;
      duplicate: string;
      fromSongs: string;
    };
    fields: {
      title: string;
      titlePlaceholder: string;
      titleHelperText: string;
      bandName: string;
      bandNameRequired: string;
      eventName: string;
      eventDate: string;
      openTime: string;
      startTime: string;
      theme: string;
    };
    songsList: {
      title: string;
      maxSongsWarning: string;
      songTitle: string;
      songNote: string;
      addSong: string;
    };
    buttons: {
      create: string;
      cancel: string;
    };
    validation: {
      titleMaxLength: string;
      titleInvalidChars: string;
      bandNameRequired: string;
      bandNameMaxLength: string;
      bandNameInvalidChars: string;
      eventNameMaxLength: string;
      eventNameInvalidChars: string;
      songTitleRequired: string;
      songTitleMaxLength: string;
      songTitleInvalidChars: string;
      songNoteMaxLength: string;
      songNoteInvalidChars: string;
      minSongsRequired: string;
      maxSongsExceeded: string;
    };
    copy: string;
  };

  // ナビゲーションメニュー
  navigation: {
    home: string;
    songs: string;
    profile: string;
    guide: string;
    privacy: string;
    terms: string;
    newSetlist: string;
    logout: string;
    loading: string;
  };

  // 楽曲管理画面
  songs: {
    title: string;
    description: string;
    empty: {
      title: string;
      description: string;
    };
    table: {
      title: string;
      artist: string;
      key: string;
      tempo: string;
      notes: string;
      actions: string;
      selectAll: string;
      selectSong: string;
      editSong: string;
      deleteSong: string;
    };
    actions: {
      addNew: string;
      createSetlist: string;
      deleteSelected: string;
      songsCount: string;
    };
    form: {
      editTitle: string;
      titleLabel: string;
      artistLabel: string;
      keyLabel: string;
      tempoLabel: string;
      notesLabel: string;
      save: string;
      cancel: string;
    };
    chips: {
      keyPrefix: string;
      tempoPrefix: string;
    };
    newSong: {
      title: string;
      create: string;
      cancel: string;
      createError: string;
      validation: {
        titleRequired: string;
        artistRequired: string;
        tempoInvalid: string;
      };
    };
  };

  // メールテンプレート
  emails: {
    verificationSubject: string;
    verificationBody: (username: string, link: string) => string;
    passwordResetSubject: string;
    passwordResetBody: (username: string, link: string) => string;
    passwordResetSuccessSubject: string;
    passwordResetSuccessBody: (username: string) => string;
    emailChangeSubject: string;
    emailChangeBody: (username: string, link: string) => string;
  };
}

// 日本語メッセージ
const jaMessages: Messages = {
  auth: {
    loginRequired: 'ログインが必要です',
    authenticationExpired: '認証の有効期限が切れました。再度ログインしてください',
    serverError: 'サーバーエラーが発生しました。後でもう一度お試しください',
    userAlreadyExists: '登録に失敗しました。入力内容をご確認ください',
    invalidCredentials: 'メールアドレスまたはパスワードが正しくありません',
    emailSent: 'メールを送信しました',
    passwordResetRequested: 'パスワードリセットのメールを送信しました',
    passwordResetSuccess: 'パスワードが正常にリセットされました',
    invalidResetToken: '無効または期限切れのリセットトークンです',
    emailVerified: 'メールアドレスが確認されました',
    invalidVerificationToken: '無効または期限切れの確認トークンです',
    emailChangedSuccess: 'メールアドレスが正常に変更されました',
    invalidChangeToken: '無効または期限切れの変更トークンです',
    passwordChangeSuccess: 'パスワードが正常に変更されました',
    currentPasswordIncorrect: '現在のパスワードが正しくありません',
    emailAlreadyVerified: 'メールアドレスは既に確認済みです',
    authRequired: '認証が必要です',
    userNotFound: 'ユーザーが見つかりません',
    rateLimitExceeded: 'リクエスト制限に達しました。しばらく待ってから再試行してください',
    checkingLoginStatus: 'ログイン状態を確認中...',
    redirectingToLogin: 'ログインページにリダイレクトしています...',

    login: 'ログイン',
    logout: 'ログアウト',
    register: '新規登録',
    email: 'メールアドレス',
    password: 'パスワード',
    username: 'ユーザー名',
    rememberMe: 'ログイン状態を保持',
    loginButton: 'ログイン',
    registerButton: '登録',
    loggingIn: 'ログイン中...',
    registering: '登録中...',
    or: 'または',
    currentPassword: '現在のパスワード',
    newPassword: '新しいパスワード',
    confirmPassword: 'パスワード（確認）',
    changePassword: 'パスワードを変更',
    resetPassword: 'パスワードをリセット',
    forgotPassword: 'パスワードを忘れた方',
    sendResetEmail: 'リセットメールを送信',
    passwordResetTitle: 'パスワードリセット',
    passwordResetDescription: 'メールアドレスを入力してパスワードリセット手順をお送りします',
    resendPasswordReset: 'パスワードリセットを再送信',
    resendAvailableIn: '再送信可能まで',
    resendCount: '回送信済み',
    emailNotFound: 'メールが届かない場合：',
    resetEmailHelp: '登録済みのメールアドレスを入力してください',
    checkSpamFolder: '迷惑メールフォルダを確認してください',
    mayTakeMinutes: '数分かかる場合があります',
    canResendAbove: '上記ボタンから再送信できます',
    backToLogin: 'ログインページに戻る',
    checkYourEmail: 'メールをご確認ください。',
    emailVerificationTitle: 'メール認証をお願いします',
    emailVerificationDescription: 'アカウントを有効化するため、メールをご確認ください',
    accountCreated: 'アカウント作成完了',
    accountCreatedDescription: 'アカウントが正常に作成されました。',
    emailVerificationPending: 'メール認証待ち',
    emailVerificationPendingDescription: 'に認証メールを送信しました。',
    loginAvailable: 'ログイン可能',
    loginAvailableDescription: 'メール認証後にログインできます。',
    emailConfirmationRequest: '📧 メール確認のお願い',
    verificationEmailSent: 'に認証メールを送信しました。',
    clickVerificationLink:
      'メールに記載されている認証リンクをクリックしてアカウントを有効化してください。',
    emailNotInSpam: '※ メールが見つからない場合は、迷惑メールフォルダもご確認ください。',
    resendVerificationEmail: '認証メールを再送信',
    resendAvailable: '再送信可能まで',
    resendCount2: '回再送信済み',
    emailNotReceived: 'メールが届かない場合：',
    checkSpamFolder2: '迷惑メールフォルダを確認してください',
    mayTakeMinutes2: '数分かかる場合があります',
    checkEmailTypo: 'メールアドレスの入力間違いがないか確認してください',
    verifyEmail: 'メールアドレスを確認',
    resendVerification: '確認メールを再送信',
    alreadyHaveAccount: 'アカウントをお持ちの方',
    dontHaveAccount: 'アカウントをお持ちでないですか？',
    loginToManageSetlists: 'アカウントにログインしてセットリストを管理',
    createAccountToStart: 'アカウントを作成してセットリスト作成を開始',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    and: 'と',
    agree: 'に同意します',
    // プロフィール関連（auth固有のみ）
    profile: 'プロフィール',
    noData: 'データなし',
    createdAt: '作成日',
    accountId: 'アカウントID',
  },
  errors: {
    serverError: 'サーバーエラーが発生しました',
    validationError: '入力内容に誤りがあります',
    networkError: 'ネットワークエラーが発生しました',
    unknownError: '予期せぬエラーが発生しました',
    setlistNotFound: 'セットリストが見つかりません',
    songNotFound: '楽曲が見つかりません',
    unauthorized: '認証が必要です',
    forbidden: 'アクセス権限がありません',
    somethingWentWrong: '何らかのエラーが発生しました',
  },
  common: {
    back: '戻る',
    submit: '送信',
    cancel: 'キャンセル',
    save: '保存',
    edit: '編集',
    delete: '削除',
    create: '作成',
    update: '更新',
    confirm: '確認',
    loading: '読み込み中...',
    success: '成功',
    error: 'エラー',
    wait: 'しばらくお待ちください',
    yes: 'はい',
    no: 'いいえ',
    song: '楽曲',
    newSong: '新しい楽曲',
    editSong: '楽曲を編集',
    deleteSong: '楽曲を削除',
    songTitle: '楽曲タイトル',
    artist: 'アーティスト',
    key: 'キー',
    tempo: 'テンポ',
    duration: '演奏時間',
    notes: 'メモ',
    addSong: '楽曲を追加',
    removeSong: '楽曲を削除',
    required: '必須',
    optional: '任意',
    pleaseEnter: '入力してください',
    pleaseSelect: '選択してください',
    invalid: '無効',
    tooShort: '短すぎます',
    tooLong: '長すぎます',
    draft: '下書き',
    published: '公開済み',
    private: '非公開',
    public: '公開',
    empty: '空',
    noData: 'データなし',
    noResults: '結果なし',
    minutes: '分',
    hours: '時間',
    days: '日',
    weeks: '週',
    months: 'ヶ月',
    years: '年',
    ago: '前',
    search: '検索',
    filter: 'フィルター',
    sort: 'ソート',
    language: '言語',
    settings: '設定',
    help: 'ヘルプ',
    about: 'このサイトについて',
    contact: 'お問い合わせ',
    feedback: 'フィードバック',
    version: 'バージョン',
    madeWith: '♪ Made with music in mind',
    setlist: 'セットリスト',
    editSetlist: 'セットリストを編集',
    deleteSetlist: 'セットリストを削除',
    setlistTitle: 'セットリストタイトル',
    bandName: 'バンド名',
    venue: '会場',
    eventDate: 'イベント日',
    eventTime: '開始時間',
    songOrder: '曲順',
    timing: 'タイミング',
    appliedFilters: '適用中のフィルター：',
    clearFilters: 'フィルターをクリア',
    filterByArtist: 'アーティストで絞り込み',
    filterByKey: 'キーで絞り込み',
    downloadImage: '画像をダウンロード',
    shareSetlist: 'セットリストを共有',
    duplicateSetlist: 'セットリストを複製',
    duplicateSuccess: 'セットリストが複製されました',
    linkCopied: 'リンクがコピーされました',
    theme: 'テーマ',
    basicBlack: 'ベーシック（黒）',
    basicWhite: 'ベーシック（白）',
    deleteConfirmation: '?',
    deleteWarning: 'この操作は取り消せません。',
    logoOfficialSite: '公式サイト',
    logoOfficialSiteTap: 'タップして公式サイトにアクセス',
    close: '閉じる',
    effectiveDate: '施行日',
  },
  validation: {
    required: '必須項目です',
    emailInvalid: '有効なメールアドレスを入力してください',
    usernameInvalid: '無効なユーザー名です',
    passwordTooShort: 'パスワードは8文字以上で、大文字・小文字・数字を含む必要があります',
    passwordsDoNotMatch: 'パスワードが一致しません',
    usernameTooShort: 'ユーザー名が短すぎます',
    titleTooShort: 'タイトルが短すぎます',
    titleTooLong: 'タイトルが長すぎます（100文字以内）',
    agreeToTerms: '利用規約とプライバシーポリシーに同意してください',
  },
  notifications: {
    setlistCreated: 'セットリストが作成されました',
    setlistUpdated: 'セットリストが更新されました',
    setlistDeleted: 'セットリストが削除されました',
    songCreated: '楽曲が作成されました',
    songAdded: '楽曲が追加されました',
    songUpdated: '楽曲が更新されました',
    songDeleted: '楽曲が削除されました',
    imageGenerated: '画像が生成されました',
    copied: 'コピーされました',
    saved: '保存されました',
    profileUpdated: 'プロフィールが更新されました',
    passwordChanged: 'パスワードが変更されました',
    emailSent: 'メールが送信されました',
    linkCopied: 'リンクがコピーされました',
    accountCreated: 'アカウントが作成されました。ログインしてください。',
  },
  pages: {
    home: {
      title: 'Setlist Studio',
      description: 'シンプルで直感的なセットリスト管理',
      subtitle: 'バンド向けセットリスト作成ツール',
      heroTitle: 'ステージで使えるセットリスト作成アプリ',
      heroSubtitle: 'ExcelやA4用紙に手書きの時代は終わりです。',
      sampleSetlists: {
        title: 'サンプルセットリスト',
        description: 'Setlist Studioで作成できるセットリストの例をご覧ください',
        blackTheme: 'ブラックテーマ',
        whiteTheme: 'ホワイトテーマ',
        blackThemeAlt: 'サンプルセットリスト - ブラックテーマ',
        whiteThemeAlt: 'サンプルセットリスト - ホワイトテーマ',
        footer: 'このようなセットリストを簡単に作成・ダウンロードできます',
      },
      dashboard: {
        title: 'あなたのセットリスト',
        loading: 'セットリストを読み込み中...',
        empty: {
          title: 'まだセットリストがありません',
          description: 'はじめてのセットリストを作成して、パフォーマンスリストを管理しましょう',
          createButton: 'セットリストを作成',
        },
        public: '公開',
        private: '非公開',
        white: 'ホワイト',
        black: 'ブラック',
        songsCount: '曲',
        edit: '編集',
        delete: {
          title: 'セットリストを削除',
          itemType: 'セットリスト',
        },
      },
    },
    login: {
      title: 'ログイン',
      description: 'アカウントにログイン',
    },
    register: {
      title: '新規登録',
      description: '新しいアカウントを作成',
    },
    setlists: {
      title: 'セットリスト一覧',
      description: 'あなたのセットリストを管理',
      empty: 'まだセットリストがありません',
      createFirst: '最初のセットリストを作成しましょう',
    },
    songs: {
      title: '楽曲一覧',
      description: 'あなたの楽曲ライブラリー',
      empty: 'まだ楽曲がありません',
      createFirst: '最初の楽曲を追加しましょう',
    },
    profile: {
      title: 'プロフィール',
      description: 'アカウント情報を管理',
    },
    guide: {
      title: 'ガイド',
      description: 'Setlist Studioの使い方',
      subtitle: '機能と使用方法の完全ガイド',
      aboutSection: {
        title: 'Setlist Studioについて',
        description1:
          'Setlist Studioは、バンドや音楽グループ向けのセットリスト生成・管理ツールです。楽曲情報を管理し、高品質なセットリスト画像を簡単に作成できます。',
        description2:
          'セットリストは「公開」または「非公開」として管理でき、公開セットリストはアカウント登録なしでも閲覧・ダウンロードが可能です。',
        alertInfo:
          '公開セットリストは共有URLを知っている人なら誰でもアクセスできます。非公開セットリストは所有者のみが閲覧できます。',
      },
      featureComparison: {
        title: '利用可能な機能',
        features: '機能',
        unregisteredUser: '未登録ユーザー',
        registeredUser: '登録ユーザー',
        publicSetlistView: '公開セットリスト閲覧',
        imageDownload: '画像ダウンロード（黒/白テーマ）',
        setlistShare: 'セットリスト共有（URL コピー）',
        setlistManagement: 'セットリスト作成・編集・削除',
        songDatabase: '楽曲データベース管理',
        publicitySettings: 'セットリスト公開設定変更',
        duplicateFunction: '自分のセットリスト複製機能',
        personalDashboard: '個人ダッシュボード',
        profileManagement: 'プロフィール管理',
      },
      accountBenefits: {
        title: 'アカウント作成でより便利に',
        description: '無料アカウントを作成すると、公開機能に加えて以下の機能が利用できます：',
        setlistCreation: {
          title: 'セットリスト作成',
          description: '無制限にオリジナルセットリストを作成・編集',
        },
        songManagement: {
          title: '楽曲管理',
          description: '個人の楽曲データベースで楽曲情報を効率的に管理',
        },
        privateFeatures: {
          title: 'プライベート機能',
          description: '非公開セットリストや個人設定などの管理機能',
        },
        signUpNow: '今すぐ始める：',
        signUpDescription:
          '右上の「新規登録」ボタンからアカウントを作成できます。メールアドレスとパスワードだけで、すぐに全機能をご利用いただけます。',
      },
      publicUsage: {
        title: '公開セットリストの使い方',
        step1: {
          title: '共有URLにアクセス',
          description: '公開セットリストの共有URLをクリックまたは入力してアクセスします',
        },
        step2: {
          title: 'セットリストを確認',
          description: '楽曲リスト、バンド情報、イベント詳細などを確認できます',
        },
        step3: {
          title: 'テーマ選択',
          description: 'ブラックまたはホワイトテーマから選択できます',
        },
        step4: {
          title: '画像ダウンロード',
          description: '「ダウンロード」ボタンをクリックして高品質画像をダウンロードします',
        },
      },
      pageDetails: {
        title: '詳細ページ機能',
        homePage: {
          title: 'ホームページ',
          unregisteredDescription: 'アプリケーションの紹介とアカウント作成への案内',
          registeredDescription:
            'あなたのセットリスト一覧を表示する個人ダッシュボード。各セットリストはカード形式で表示され、直接閲覧・編集できます。',
          feature1: 'セットリスト作成への素早いアクセス',
          feature2: 'レスポンシブグリッドレイアウト',
          feature3: 'テーマベースのカードデザイン',
        },
        setlistDetail: {
          title: 'セットリスト詳細ページ',
          description: 'セットリストの詳細表示と各種操作が可能です。',
          feature1: '楽曲リストとイベント情報表示',
          feature2: 'テーマ変更（ブラック/ホワイト）',
          feature3: '高品質画像ダウンロード',
          feature4: 'URL共有機能',
          feature5: '編集機能（所有者のみ）',
          feature6: '複製機能（ログインユーザー）',
        },
        songManagement: {
          title: '楽曲管理ページ',
          description: '個人の楽曲データベースを管理できます。',
          feature1: '楽曲の追加・編集・削除',
          feature2: 'タイトル、アーティスト、キー、テンポ管理',
          feature3: '演奏時間とメモ機能',
          feature4: '検索・絞り込み機能',
          feature5: 'セットリスト作成時の楽曲選択',
        },
        setlistCreation: {
          title: 'セットリスト作成ページ',
          description: '新しいセットリストを作成できます。',
          feature1: '基本情報設定（タイトル、バンド名）',
          feature2: 'イベント情報（会場、日時、開演時間）',
          feature3: '楽曲追加とドラッグ&ドロップ並び替え',
          feature4: '最大20曲まで追加可能',
          feature5: 'テーマ選択（ブラック/ホワイト）',
          feature6: '非公開/公開設定',
          feature7: '複製元がある場合の自動入力',
        },
        profile: {
          title: 'プロフィールページ',
          description: 'アカウント情報の確認・管理ができます。',
          feature1: 'ユーザー名とメールアドレス表示',
          feature2: 'アカウント作成日時',
          feature3: '統計情報（作成セットリスト数など）',
          feature4: 'アカウント設定',
        },
      },
    },
    privacy: {
      title: 'プライバシーポリシー',
    },
    terms: {
      title: '利用規約',
    },
  },
  features: {
    title: '主な機能',
    setlistManagement: {
      title: 'セットリスト作成',
      description: '登録した楽曲からセットリストを作成します。',
    },
    songLibrary: {
      title: '楽曲管理',
      description: '楽曲の詳細情報（タイトル、アーティスト、キー、テンポ）を登録・管理します。',
    },
    imageGeneration: {
      title: '画像生成',
      description: '美しいセットリスト画像を生成',
    },
    sharing: {
      title: '共有',
      description: 'セットリストを簡単に共有',
    },
    themes: {
      title: 'テーマ',
      description: '複数のテーマから選択',
    },
    qrCode: {
      title: 'QRコード',
      description: 'QRコード経由でアクセス',
    },
  },
  confirmations: {
    deleteSetlist: 'このセットリストを削除してもよろしいですか？',
    deleteSong: 'この楽曲を削除してもよろしいですか？',
    logout: 'ログアウトしてもよろしいですか？',
    unsavedChanges: '保存されていない変更があります。破棄してもよろしいですか？',
    makePublic: 'このセットリストを公開してもよろしいですか？',
    makePrivate: 'このセットリストを非公開にしてもよろしいですか？',
  },
  footer: {
    contact: 'お問い合わせはこちら',
  },
  setlistDetail: {
    successMessage: 'セットリストが正常に生成されました！',
    actions: {
      download: 'ダウンロード',
      share: '共有',
      duplicate: '複製',
      makePublic: '公開にする',
      makePrivate: '非公開にする',
    },
    deleteDialog: {
      title: 'セットリストを削除',
      message: '?',
      warning: 'この操作は取り消せません。',
      cancel: 'キャンセル',
      delete: '削除',
      deleting: '削除中...',
    },
  },
  setlistForm: {
    titles: {
      create: '新しいセットリストを作成',
      duplicate: 'セットリストを複製',
      fromSongs: '選択した楽曲からセットリストを作成',
    },
    fields: {
      title: 'セットリスト名',
      titlePlaceholder: '任意',
      titleHelperText: '空欄の場合、自動的に番号が付けられます',
      bandName: 'バンド名',
      bandNameRequired: '必須',
      eventName: 'イベント名',
      eventDate: 'イベント日',
      openTime: '開場時間',
      startTime: '開始時間',
      theme: 'テーマ',
    },
    songsList: {
      title: '楽曲リスト',
      maxSongsWarning: '最大20曲まで追加できます。',
      songTitle: '楽曲タイトル',
      songNote: 'メモ',
      addSong: '楽曲を追加',
    },
    buttons: {
      create: 'セットリストを作成',
      cancel: 'キャンセル',
    },
    validation: {
      titleMaxLength: 'セットリスト名は100文字以内で入力してください',
      titleInvalidChars: 'セットリスト名に無効な文字が含まれています',
      bandNameRequired: 'バンド名は必須です',
      bandNameMaxLength: 'バンド名は100文字以内で入力してください',
      bandNameInvalidChars: 'バンド名に無効な文字が含まれています',
      eventNameMaxLength: 'イベント名は200文字以内で入力してください',
      eventNameInvalidChars: 'イベント名に無効な文字が含まれています',
      songTitleRequired: '楽曲タイトルは必須です',
      songTitleMaxLength: '楽曲タイトルは200文字以内で入力してください',
      songTitleInvalidChars: '楽曲タイトルに無効な文字が含まれています',
      songNoteMaxLength: 'メモは500文字以内で入力してください',
      songNoteInvalidChars: 'メモに無効な文字が含まれています',
      minSongsRequired: '最低1曲は必要です',
      maxSongsExceeded: '最大20曲まで許可されています',
    },
    copy: 'コピー',
  },
  navigation: {
    home: 'ホーム',
    songs: '楽曲',
    profile: 'プロフィール',
    guide: 'ガイド',
    privacy: 'プライバシーポリシー',
    terms: '利用規約',
    newSetlist: '新しいセットリスト',
    logout: 'ログアウト',
    loading: '読み込み中...',
  },
  songs: {
    title: '楽曲管理',
    description:
      '楽曲を管理・編集します。チェックボックスで楽曲を選択してセットリストを作成できます。',
    empty: {
      title: '楽曲がありません',
      description: '新しい楽曲を追加してください',
    },
    table: {
      title: 'タイトル',
      artist: 'アーティスト',
      key: 'キー',
      tempo: 'テンポ',
      notes: 'メモ',
      actions: 'アクション',
      selectAll: '全選択/全解除',
      selectSong: ' 楽曲',
      editSong: ' 楽曲',
      deleteSong: ' 楽曲',
    },
    actions: {
      addNew: '新しい楽曲を追加',
      createSetlist: '選択した楽曲でセットリストを作成',
      deleteSelected: '選択した楽曲を削除',
      songsCount: ' 曲',
    },
    form: {
      editTitle: '楽曲を編集',
      titleLabel: 'タイトル',
      artistLabel: 'アーティスト',
      keyLabel: 'キー',
      tempoLabel: 'テンポ',
      notesLabel: 'メモ',
      save: '保存',
      cancel: 'キャンセル',
    },
    chips: {
      keyPrefix: 'キー: ',
      tempoPrefix: 'テンポ: ',
    },
    newSong: {
      title: '新しい楽曲を追加',
      create: '作成',
      cancel: 'キャンセル',
      createError: '楽曲の作成に失敗しました',
      validation: {
        titleRequired: '楽曲タイトルは必須です',
        artistRequired: 'アーティスト名は必須です',
        tempoInvalid: '有効な数値を入力してください',
      },
    },
  },
  emails: {
    verificationSubject: 'メールアドレスの確認',
    verificationBody: (username: string, link: string) => `
こんにちは ${username} さん,

アカウントを有効化するため、以下のリンクをクリックしてメールアドレスを確認してください：

${link}

このリンクは24時間で期限切れになります。
このメールに心当たりがない場合は、無視してください。

よろしくお願いします,
Setlist Studio チーム
`,
    passwordResetSubject: 'パスワードリセット',
    passwordResetBody: (username: string, link: string) => `
こんにちは ${username} さん,

パスワードリセットの要求を受け付けました。
以下のリンクをクリックして新しいパスワードを設定してください：

${link}

このリンクは24時間で期限切れになります。
パスワードリセットを要求していない場合は、このメールを無視してください。

よろしくお願いします,
Setlist Studio チーム
`,
    passwordResetSuccessSubject: 'パスワード変更完了',
    passwordResetSuccessBody: (username: string) => `
こんにちは ${username} さん,

パスワードが正常に変更されました。
この変更に心当たりがない場合は、すぐにサポートまでご連絡ください。

よろしくお願いします,
Setlist Studio チーム
`,
    emailChangeSubject: 'メールアドレス変更の確認',
    emailChangeBody: (username: string, link: string) => `
こんにちは ${username} さん,

メールアドレスの変更要求を受け付けました。
以下のリンクをクリックして変更を確認してください：

${link}

このリンクは24時間で期限切れになります。
メールアドレス変更を要求していない場合は、このメールを無視してください。

よろしくお願いします,
Setlist Studio チーム
`,
  },
};

// 言語検出関数
export function detectLanguage(acceptLanguage?: string): Language {
  if (!acceptLanguage) {
    return 'ja'; // デフォルトは日本語
  }

  // Accept-Language ヘッダーをパース
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [locale, q = '1'] = lang.trim().split(';q=');
      return {
        locale: locale.toLowerCase().split('-')[0],
        quality: parseFloat(q),
      };
    })
    .sort((a, b) => b.quality - a.quality);

  // サポートされている言語から最適なものを選択
  for (const { locale } of languages) {
    if (locale === 'ja' || locale === 'en') {
      return locale as Language;
    }
  }

  return 'ja'; // デフォルトは日本語
}

// メッセージ取得関数
export function getMessages(lang: Language): Messages {
  switch (lang) {
    case 'ja':
      return jaMessages;
    case 'en':
      return enMessages;
    default:
      return enMessages;
  }
}
const enMessages: Messages = {
  auth: {
    loginRequired: 'Login required',
    authenticationExpired: 'Authentication expired. Please login again',
    serverError: 'Server error occurred. Please try again later.',
    userAlreadyExists: 'Registration failed. Please check your input',
    invalidCredentials: 'Invalid email or password',
    emailSent: 'Email sent',
    passwordResetRequested: 'Password reset instructions have been sent to your email.',
    passwordResetSuccess: 'Password has been reset successfully.',
    invalidResetToken: 'Invalid or expired reset token.',
    emailVerified: 'Email address has been verified successfully.',
    invalidVerificationToken: 'Invalid or expired verification token.',
    emailChangedSuccess: 'Email address has been changed successfully.',
    invalidChangeToken: 'Invalid or expired change token.',
    passwordChangeSuccess: 'Password has been changed successfully.',
    currentPasswordIncorrect: 'Current password is incorrect',
    emailAlreadyVerified: 'Email address is already verified.',
    authRequired: 'Authentication required.',
    userNotFound: 'User not found',
    rateLimitExceeded: 'Request limit exceeded.',
    checkingLoginStatus: 'Checking login status...',
    redirectingToLogin: 'Redirecting to login...',

    // Login/Register form
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    rememberMe: 'Remember me',
    loginButton: 'Login',
    registerButton: 'Register',
    loggingIn: 'Logging in...',
    registering: 'Registering...',
    or: 'or',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    changePassword: 'Change Password',
    resetPassword: 'Reset Password',
    forgotPassword: 'Forgot Password?',
    sendResetEmail: 'Send Reset Email',
    passwordResetTitle: 'Password Reset',
    passwordResetDescription:
      "Enter your email address and we'll send you password reset instructions",
    resendPasswordReset: 'Resend Password Reset',
    resendAvailableIn: 'Resend available in',
    resendCount: 'sent',
    emailNotFound: 'Email not received?',
    resetEmailHelp: 'Enter your registered email address',
    checkSpamFolder: 'Check your spam folder',
    mayTakeMinutes: 'It may take a few minutes',
    canResendAbove: 'You can resend from the button above',
    backToLogin: 'Back to Login',
    checkYourEmail: 'Check your email.',
    // Email verification page
    emailVerificationTitle: 'Please Verify Your Email',
    emailVerificationDescription: 'Check your email to activate your account',
    accountCreated: 'Account Created',
    accountCreatedDescription: 'Your account has been created successfully.',
    emailVerificationPending: 'Email Verification Pending',
    emailVerificationPendingDescription: 'Verification email has been sent to',
    loginAvailable: 'Login Available',
    loginAvailableDescription: 'You can login after email verification.',
    emailConfirmationRequest: '📧 Email Confirmation Request',
    verificationEmailSent: 'Verification email has been sent to',
    clickVerificationLink:
      'Please click the verification link in the email to activate your account.',
    emailNotInSpam: "※ If you can't find the email, please check your spam folder.",
    resendVerificationEmail: 'Resend Verification Email',
    resendAvailable: 'Resend available in',
    resendCount2: 'times resent',
    emailNotReceived: 'Email not received?',
    checkSpamFolder2: 'Check your spam folder',
    mayTakeMinutes2: 'It may take a few minutes',
    checkEmailTypo: 'Check for typos in your email address',
    verifyEmail: 'Verify Email',
    resendVerification: 'Resend Verification',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    loginToManageSetlists: 'Login to manage your setlists',
    createAccountToStart: 'Create an account to start creating setlists',
    // Terms & Privacy
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    and: ' and ',
    agree: ' agreement',
    // Profile related（auth固有のみ）
    profile: 'Profile',
    noData: 'No data',
    createdAt: 'Created at',
    accountId: 'Account ID',
  },
  errors: {
    serverError: 'Server error occurred',
    validationError: 'Validation error',
    networkError: 'Network error occurred',
    unknownError: 'Unknown error occurred',
    setlistNotFound: 'Setlist not found',
    songNotFound: 'Song not found',
    unauthorized: 'Authentication required',
    forbidden: 'Access denied',
    somethingWentWrong: 'Something went wrong',
  },
  pages: {
    home: {
      title: 'Home',
      description: 'Setlist management app',
      subtitle: 'Setlist creation tool for bands',
      heroTitle: 'Setlist creation app for artists that can be used on stage.',
      heroSubtitle: 'The era of Excel and handwritten lists is over.',
      sampleSetlists: {
        title: 'Sample Setlists',
        description: 'See examples of setlists that can be created with Setlist Studio',
        blackTheme: 'Black Theme',
        whiteTheme: 'White Theme',
        blackThemeAlt: 'Sample Setlist - Black Theme',
        whiteThemeAlt: 'Sample Setlist - White Theme',
        footer: 'You can easily create and download setlists like these',
      },
      dashboard: {
        title: 'Your Setlists',
        loading: 'Loading setlists...',
        empty: {
          title: 'No setlists yet',
          description: 'Create your first setlist to manage your performance lists',
          createButton: 'Create Setlist',
        },
        public: 'Public',
        private: 'Private',
        white: 'White',
        black: 'Black',
        songsCount: 'songs',
        edit: 'Edit',
        delete: {
          title: 'Delete Setlist',
          itemType: 'Setlist',
        },
      },
    },
    login: {
      title: 'Login',
      description: 'Login to your account',
    },
    register: {
      title: 'Register',
      description: 'Create a new account',
    },
    setlists: {
      title: 'Setlists',
      description: 'Manage your setlists',
      empty: 'No setlists yet',
      createFirst: 'Create your first setlist',
    },
    songs: {
      title: 'Songs',
      description: 'Manage your songs',
      empty: 'No songs yet',
      createFirst: 'Add your first song',
    },
    profile: {
      title: 'Profile',
      description: 'Profile settings',
    },
    guide: {
      title: 'Guide',
      description: 'How to use guide',
      subtitle: 'Complete guide to features and usage',
      aboutSection: {
        title: 'About Setlist Studio',
        description1:
          'Setlist Studio is a setlist generation and management tool for bands and music groups. You can manage song information and easily create high-quality setlist images.',
        description2:
          'Setlists can be managed as "Public" or "Private", and public setlists can be viewed and downloaded without account registration.',
        alertInfo:
          'Public setlists can be accessed by anyone who knows the sharing URL. Private setlists can only be viewed by the owner.',
      },
      featureComparison: {
        title: 'Available Features',
        features: 'Features',
        unregisteredUser: 'Unregistered User',
        registeredUser: 'Registered User',
        publicSetlistView: 'Public Setlist View',
        imageDownload: 'Image Download (Black/White Theme)',
        setlistShare: 'Setlist Sharing (URL Copy)',
        setlistManagement: 'Setlist Creation/Edit/Delete',
        songDatabase: 'Song Database Management',
        publicitySettings: 'Setlist Public Setting Change',
        duplicateFunction: 'Own Setlist Duplicate Function',
        personalDashboard: 'Personal Dashboard',
        profileManagement: 'Profile Management',
      },
      accountBenefits: {
        title: 'More Convenient with Account Creation',
        description:
          'Creating a free account gives you access to the following features in addition to public features:',
        setlistCreation: {
          title: 'Setlist Creation',
          description: 'Create and edit unlimited original setlists',
        },
        songManagement: {
          title: 'Song Management',
          description: 'Efficiently manage song information with your personal song database',
        },
        privateFeatures: {
          title: 'Private Features',
          description: 'Management features such as private setlists and personal settings',
        },
        signUpNow: 'Get Started Now:',
        signUpDescription:
          'You can create an account using the "Register" button in the top right. With just an email address and password, you can immediately use all features.',
      },
      publicUsage: {
        title: 'How to Use Public Setlists',
        step1: {
          title: 'Access Sharing URL',
          description: 'Click or enter the sharing URL of the public setlist to access it',
        },
        step2: {
          title: 'Check Setlist',
          description: 'Review song list, band information, event details, etc.',
        },
        step3: {
          title: 'Select Theme',
          description: 'Choose from Black or White theme',
        },
        step4: {
          title: 'Download Image',
          description: 'Click the "Download" button to download high-quality images',
        },
      },
      pageDetails: {
        title: 'Detailed Page Features',
        homePage: {
          title: 'Home Page',
          unregisteredDescription: 'Introduction to the application and guide to account creation',
          registeredDescription:
            'Personal dashboard displaying your setlist overview. Each setlist is displayed in card format and can be directly viewed and edited.',
          feature1: 'Quick access to setlist creation',
          feature2: 'Responsive grid layout',
          feature3: 'Theme-based card design',
        },
        setlistDetail: {
          title: 'Setlist Detail Page',
          description: 'Detailed display of setlists and various operations are possible.',
          feature1: 'Song list and event information display',
          feature2: 'Theme change (Black/White)',
          feature3: 'High-quality image download',
          feature4: 'URL sharing function',
          feature5: 'Edit function (owner only)',
          feature6: 'Duplicate function (logged-in users)',
        },
        songManagement: {
          title: 'Song Management Page',
          description: 'You can manage your personal song database.',
          feature1: 'Add, edit, and delete songs',
          feature2: 'Title, artist, key, tempo management',
          feature3: 'Play time and memo function',
          feature4: 'Search and filtering functions',
          feature5: 'Song selection when creating setlists',
        },
        setlistCreation: {
          title: 'Setlist Creation Page',
          description: 'You can create new setlists.',
          feature1: 'Basic information setting (title, band name)',
          feature2: 'Event information (venue, date, show time)',
          feature3: 'Song addition and drag & drop reordering',
          feature4: 'Up to 20 songs can be added',
          feature5: 'Theme selection (Black/White)',
          feature6: 'Private/Public settings',
          feature7: 'Auto-fill when there is a duplicate source',
        },
        profile: {
          title: 'Profile Page',
          description: 'You can check and manage your account information.',
          feature1: 'Username and email address display',
          feature2: 'Account creation date and time',
          feature3: 'Statistics (number of setlists created, etc.)',
          feature4: 'Account settings',
        },
      },
    },
    privacy: {
      title: 'Privacy Policy',
    },
    terms: {
      title: 'Terms of Service',
    },
  },
  features: {
    title: 'Main Features',
    setlistManagement: {
      title: 'Setlist Creation',
      description: 'Create setlists from your registered songs.',
    },
    songLibrary: {
      title: 'Song Management',
      description: 'Register and manage detailed song information (title, artist, key, tempo).',
    },
    imageGeneration: {
      title: 'Image Generation',
      description: 'Generate beautiful setlist images',
    },
    sharing: {
      title: 'Sharing',
      description: 'Easily share your setlists',
    },
    themes: {
      title: 'Themes',
      description: 'Choose from multiple themes',
    },
    qrCode: {
      title: 'QR Code',
      description: 'Access via QR code',
    },
  },
  notifications: {
    setlistCreated: 'Setlist created',
    setlistUpdated: 'Setlist updated',
    setlistDeleted: 'Setlist deleted',
    songCreated: 'Song created',
    songAdded: 'Song added',
    songUpdated: 'Song updated',
    songDeleted: 'Song deleted',
    imageGenerated: 'Image generated',
    copied: 'Copied',
    saved: 'Saved',
    profileUpdated: 'Profile updated',
    passwordChanged: 'Password changed',
    emailSent: 'Email sent',
    linkCopied: 'Link copied',
    accountCreated: 'Account created successfully',
  },
  confirmations: {
    deleteSetlist: 'Are you sure you want to delete this setlist?',
    deleteSong: 'Are you sure you want to delete this song?',
    logout: 'Are you sure you want to logout?',
    unsavedChanges: 'You have unsaved changes. Are you sure you want to discard them?',
    makePublic: 'Are you sure you want to make this setlist public?',
    makePrivate: 'Are you sure you want to make this setlist private?',
  },
  validation: {
    required: 'This field is required',
    emailInvalid: 'Invalid email address',
    usernameInvalid: 'Invalid username',
    passwordTooShort: 'Password is too short',
    passwordsDoNotMatch: 'Passwords do not match',
    usernameTooShort: 'Username is too short',
    titleTooShort: 'Title is too short',
    titleTooLong: 'Title is too long',
    agreeToTerms: 'Please agree to the terms and privacy policy',
  },
  footer: {
    contact: 'Contact us here',
  },
  common: {
    back: 'Back',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    update: 'Update',
    confirm: 'Confirm',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    wait: 'Please wait',
    yes: 'Yes',
    no: 'No',
    song: 'Song',
    newSong: 'New Song',
    editSong: 'Edit Song',
    deleteSong: 'Delete Song',
    songTitle: 'Song Title',
    artist: 'Artist',
    key: 'Key',
    tempo: 'Tempo',
    duration: 'Duration',
    notes: 'Notes',
    addSong: 'Add Song',
    removeSong: 'Remove Song',
    required: 'Required',
    optional: 'Optional',
    pleaseEnter: 'Please enter',
    pleaseSelect: 'Please select',
    invalid: 'Invalid',
    tooShort: 'Too short',
    tooLong: 'Too long',
    draft: 'Draft',
    published: 'Published',
    private: 'Private',
    public: 'Public',
    empty: 'Empty',
    noData: 'No data',
    noResults: 'No results',
    minutes: 'minutes',
    hours: 'hours',
    days: 'days',
    weeks: 'weeks',
    months: 'months',
    years: 'years',
    ago: 'ago',
    search: 'Search',
    filter: 'Filter',
    sort: 'Sort',
    language: 'Language',
    settings: 'Settings',
    help: 'Help',
    about: 'About',
    contact: 'Contact',
    feedback: 'Feedback',
    version: 'Version',
    madeWith: '♪ Made with music in mind',
    setlist: 'Setlist',
    editSetlist: 'Edit Setlist',
    deleteSetlist: 'Delete Setlist',
    setlistTitle: 'Setlist Title',
    bandName: 'Band Name',
    venue: 'Venue',
    eventDate: 'Event Date',
    eventTime: 'Start Time',
    songOrder: 'Song Order',
    timing: 'Timing',
    appliedFilters: 'Applied filters:',
    clearFilters: 'Clear filters',
    filterByArtist: 'Filter by artist',
    filterByKey: 'Filter by key',
    downloadImage: 'Download Image',
    shareSetlist: 'Share Setlist',
    duplicateSetlist: 'Duplicate Setlist',
    duplicateSuccess: 'Setlist duplicated successfully',
    linkCopied: 'Link copied',
    theme: 'Theme',
    basicBlack: 'Basic (Black)',
    basicWhite: 'Basic (White)',
    deleteConfirmation: '?',
    deleteWarning: 'This action cannot be undone.',
    logoOfficialSite: 'Official Site',
    logoOfficialSiteTap: 'Tap to visit official site',
    close: 'Close',
    effectiveDate: 'Effective Date',
  },
  setlistDetail: {
    successMessage: 'Setlist generated successfully!',
    actions: {
      download: 'Download',
      share: 'Share',
      duplicate: 'Duplicate',
      makePublic: 'Make Public',
      makePrivate: 'Make Private',
    },
    deleteDialog: {
      title: 'Delete Setlist',
      message: '?',
      warning: 'This action cannot be undone.',
      cancel: 'Cancel',
      delete: 'Delete',
      deleting: 'Deleting...',
    },
  },
  setlistForm: {
    titles: {
      create: 'Create New Setlist',
      duplicate: 'Duplicate Setlist',
      fromSongs: 'Create Setlist from Selected Songs',
    },
    fields: {
      title: 'Setlist Name',
      titlePlaceholder: 'Optional',
      titleHelperText: 'If left blank, will be automatically numbered',
      bandName: 'Band Name',
      bandNameRequired: 'Required',
      eventName: 'Event Name',
      eventDate: 'Event Date',
      openTime: 'Open Time',
      startTime: 'Start Time',
      theme: 'Theme',
    },
    songsList: {
      title: 'Song List',
      maxSongsWarning: 'You can add up to 20 songs.',
      songTitle: 'Song Title',
      songNote: 'Note',
      addSong: 'Add Song',
    },
    buttons: {
      create: 'Create Setlist',
      cancel: 'Cancel',
    },
    validation: {
      titleMaxLength: 'Setlist name must be 100 characters or less',
      titleInvalidChars: 'Setlist name contains invalid characters',
      bandNameRequired: 'Band name is required',
      bandNameMaxLength: 'Band name must be 100 characters or less',
      bandNameInvalidChars: 'Band name contains invalid characters',
      eventNameMaxLength: 'Event name must be 200 characters or less',
      eventNameInvalidChars: 'Event name contains invalid characters',
      songTitleRequired: 'Song title is required',
      songTitleMaxLength: 'Song title must be 200 characters or less',
      songTitleInvalidChars: 'Song title contains invalid characters',
      songNoteMaxLength: 'Note must be 500 characters or less',
      songNoteInvalidChars: 'Note contains invalid characters',
      minSongsRequired: 'At least 1 song is required',
      maxSongsExceeded: 'Maximum 20 songs allowed',
    },
    copy: 'Copy',
  },
  navigation: {
    home: 'Home',
    songs: 'Songs',
    profile: 'Profile',
    guide: 'Guide',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    newSetlist: 'New Setlist',
    logout: 'Logout',
    loading: 'Loading...',
  },
  songs: {
    title: 'Song Management',
    description: 'Manage and edit songs. Select songs with checkboxes to create setlists.',
    empty: {
      title: 'No songs available',
      description: 'Please add a new song',
    },
    table: {
      title: 'Title',
      artist: 'Artist',
      key: 'Key',
      tempo: 'Tempo',
      notes: 'Notes',
      actions: 'Actions',
      selectAll: 'Select/Deselect All',
      selectSong: ' song',
      editSong: ' song',
      deleteSong: ' song',
    },
    actions: {
      addNew: 'Add New Song',
      createSetlist: 'Create Setlist with Selected Songs',
      deleteSelected: 'Delete Selected Songs',
      songsCount: ' songs',
    },
    form: {
      editTitle: 'Edit Song',
      titleLabel: 'Title',
      artistLabel: 'Artist',
      keyLabel: 'Key',
      tempoLabel: 'Tempo',
      notesLabel: 'Notes',
      save: 'Save',
      cancel: 'Cancel',
    },
    chips: {
      keyPrefix: 'Key: ',
      tempoPrefix: 'Tempo: ',
    },
    newSong: {
      title: 'Add New Song',
      create: 'Create',
      cancel: 'Cancel',
      createError: 'Failed to create song',
      validation: {
        titleRequired: 'Song title is required',
        artistRequired: 'Artist name is required',
        tempoInvalid: 'Please enter a valid number',
      },
    },
  },
  emails: {
    verificationSubject: 'Verify your email address',
    verificationBody: (username: string, link: string) => `
Hello ${username},

Thank you for registering with Setlist Studio.
Please click the link below to verify your email address:

${link}

This link will expire in 24 hours.

Best regards,
Setlist Studio Team
`,
    passwordResetSubject: 'Password Reset Request',
    passwordResetBody: (username: string, link: string) => `
Hello ${username},

We received a request to reset your password.
Please click the link below to set a new password:

${link}

This link will expire in 1 hour.
If you didn't request this, please ignore this email.

Best regards,
Setlist Studio Team
`,
    passwordResetSuccessSubject: 'Password Changed',
    passwordResetSuccessBody: (username: string) => `
Hello ${username},

Your password has been changed successfully.
If you didn't make this change, please contact support immediately.

Best regards,
Setlist Studio Team
`,
    emailChangeSubject: 'Confirm Email Change',
    emailChangeBody: (username: string, link: string) => `
Hello ${username},

We received a request to change your email address.
Please click the link below to confirm this change:

${link}

This link will expire in 24 hours.
If you didn't request this, please ignore this email.

Best regards,
Setlist Studio Team
`,
  },
};

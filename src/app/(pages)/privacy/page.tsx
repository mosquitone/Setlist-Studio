'use client';

import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import LegalPageTemplate from '@/components/common/templates/LegalPageTemplate';
import { useI18n } from '@/hooks/useI18n';

const PrivacyPage: React.FC = () => {
  const { messages } = useI18n();

  return (
    <LegalPageTemplate title={messages.pages.privacy.title}>
      <Typography variant="body2" color="text.secondary" paragraph>
        mosquitone（以下、「当方」といいます。）は、本ウェブサイト上で提供するサービス「Setlist
        Studio」（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第1条（個人情報）
      </Typography>
      <Typography variant="body2" paragraph>
        「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第2条（個人情報の収集方法）
      </Typography>
      <Typography variant="body2" paragraph>
        当方は、ユーザーが利用登録をする際にメールアドレス、ユーザー名、パスワードなどの個人情報をお尋ねすることがあります。また、ユーザーがサービスを利用される際に、楽曲情報、セットリスト情報などのコンテンツデータを収集することがあります。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第3条（個人情報を収集・利用する目的）
      </Typography>
      <Typography variant="body2" paragraph>
        当方が個人情報を収集・利用する目的は、以下のとおりです。
      </Typography>
      <List dense sx={{ pl: 2 }}>
        <ListItem>
          <ListItemText
            primary="1. 当方サービスの提供・運営のため"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="2. ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="3. ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当方が提供する他のサービスの案内のメールを送付するため"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="4. メンテナンス、重要なお知らせなど必要に応じたご連絡のため"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="5. 利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="6. ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="7. 上記の利用目的に付随する目的"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
      </List>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第4条（利用目的の変更）
      </Typography>
      <Typography variant="body2" paragraph>
        1.
        当方は、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
      </Typography>
      <Typography variant="body2" paragraph>
        2.
        利用目的の変更を行った場合には、変更後の目的について、当方所定の方法により、ユーザーに通知し、または本ウェブサイト上に公表するものとします。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第5条（個人情報の第三者提供）
      </Typography>
      <Typography variant="body2" paragraph>
        1.
        当方は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
      </Typography>
      <List dense sx={{ pl: 2 }}>
        <ListItem>
          <ListItemText
            primary="（1）人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="（2）公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="（3）国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <ListItemText
            primary="（4）予め次の事項を告知あるいは公表し、かつ当方が個人情報保護委員会に届出をしたとき"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <List dense sx={{ pl: 2, width: '100%' }}>
            <ListItem>
              <ListItemText
                primary="・利用目的に第三者への提供を含むこと"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="・第三者に提供されるデータの項目"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="・第三者への提供の手段または方法"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="・本人の求めに応じて個人情報の第三者への提供を停止すること"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="・本人の求めを受け付ける方法"
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          </List>
        </ListItem>
      </List>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第6条（個人情報の開示）
      </Typography>
      <Typography variant="body2" paragraph>
        1.
        当方は、本人から個人情報の開示を求められたときは、本人に対し、遅滞なくこれを開示します。ただし、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり、開示しない決定をした場合には、その旨を遅滞なく通知します。
      </Typography>
      <List dense sx={{ pl: 2 }}>
        <ListItem>
          <ListItemText
            primary="（1）本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="（2）当方の業務の適正な実施に著しい支障を及ぼすおそれがある場合"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="（3）その他法令に違反することとなる場合"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
      </List>
      <Typography variant="body2" paragraph>
        2.
        前項の定めにかかわらず、履歴情報および特性情報などの個人情報以外の情報については、原則として開示いたしません。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第7条（個人情報の訂正および削除）
      </Typography>
      <Typography variant="body2" paragraph>
        1.
        ユーザーは、当方の保有する自己の個人情報が誤った情報である場合には、当方が定める手続きにより、当方に対して個人情報の訂正、追加または削除（以下、「訂正等」といいます。）を請求することができます。
      </Typography>
      <Typography variant="body2" paragraph>
        2.
        当方は、ユーザーから前項の請求を受けてその請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の訂正等を行うものとします。
      </Typography>
      <Typography variant="body2" paragraph>
        3.
        当方は、前項の規定に基づき訂正等を行った場合、または訂正等を行わない旨の決定をしたときは遅滞なく、これをユーザーに通知します。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第8条（個人情報の利用停止等）
      </Typography>
      <Typography variant="body2" paragraph>
        1.
        当方は、本人から、個人情報が、利用目的の範囲を超えて取り扱われているという理由、または不正の手段により取得されたものであるという理由により、その利用の停止または消去（以下、「利用停止等」といいます。）を求められた場合には、遅滞なく必要な調査を行います。
      </Typography>
      <Typography variant="body2" paragraph>
        2.
        前項の調査結果に基づき、その請求に応じる必要があると判断した場合には、遅滞なく、当該個人情報の利用停止等を行います。
      </Typography>
      <Typography variant="body2" paragraph>
        3.
        当方は、前項の規定に基づき利用停止等を行った場合、または利用停止等を行わない旨の決定をしたときは、遅滞なく、これをユーザーに通知します。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第9条（Cookieの使用）
      </Typography>
      <Typography variant="body2" paragraph>
        1. 当方のサービスは、一部Cookieを利用しています。
      </Typography>
      <Typography variant="body2" paragraph>
        2. 当方は、認証機能の提供のため、JWTトークンを含む認証情報をHttpOnly
        Cookieに保存しています。このCookieには、ユーザーを特定するための情報が含まれており、ユーザーの認証状態を維持するために使用されます。
      </Typography>
      <Typography variant="body2" paragraph>
        3.
        Cookieの受け入れを希望されない場合は、ブラウザの設定で変更することができます。ただし、Cookieを無効化すると、当方サービスの一部の機能をご利用いただけなくなる場合があります。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第10条（セキュリティ）
      </Typography>
      <Typography variant="body2" paragraph>
        当方は、個人情報の紛失、破壊、改ざん及び漏洩などのリスクに対して、以下のセキュリティ対策を実施しています：
      </Typography>
      <List dense sx={{ pl: 2 }}>
        <ListItem>
          <ListItemText
            primary="・HttpOnly Cookie認証によるXSS攻撃防止"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・CSRF保護による不正リクエスト防止"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・レート制限による不正アクセス防止"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・脅威検出システムによる異常アクセス監視"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・パスワードのハッシュ化による安全な保存"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・データベースへの不正アクセス防止"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・定期的なセキュリティデータクリーンアップ"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
      </List>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第11条（データ保存・削除ポリシー）
      </Typography>
      <Typography variant="body2" paragraph>
        1. 当方は、ユーザーがサービスを利用される限り、個人情報を保存します。
      </Typography>
      <Typography variant="body2" paragraph>
        2. 当方は、セキュリティ保護のため、以下のデータを定期的に自動削除します：
      </Typography>
      <List dense sx={{ pl: 2 }}>
        <ListItem>
          <ListItemText
            primary="・レート制限ログ（一定期間経過後）"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・脅威検出ログ（一定期間経過後）"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="・セッショントークン（期限切れ後）"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </ListItem>
      </List>
      <Typography variant="body2" paragraph>
        3. ユーザーは、アカウントを削除することで、関連する個人情報を簡単に削除することができます。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第12条（プライバシーポリシーの変更）
      </Typography>
      <Typography variant="body2" paragraph>
        1.
        本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
      </Typography>
      <Typography variant="body2" paragraph>
        2.
        当方が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
      </Typography>

      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        第13条（お問い合わせ窓口）
      </Typography>
      <Typography variant="body2" paragraph>
        本ポリシーに関するお問い合わせは、本サービス内のお問い合わせフォームよりお願いいたします。
      </Typography>
    </LegalPageTemplate>
  );
};

export default PrivacyPage;

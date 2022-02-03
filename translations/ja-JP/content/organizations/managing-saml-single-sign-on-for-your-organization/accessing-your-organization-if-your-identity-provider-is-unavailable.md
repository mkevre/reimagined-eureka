---
title: アイデンティティプロバイダが利用できない場合の Organization へのアクセス
intro: 'アイデンティティプロバイダが利用できない場合でも、Organization の管理者はシングルサインオンをバイパスし、リカバリコードを利用して {% data variables.product.product_name %}にサインインできます。'
redirect_from:
  - /articles/accessing-your-organization-if-your-identity-provider-is-unavailable
  - /github/setting-up-and-managing-organizations-and-teams/accessing-your-organization-if-your-identity-provider-is-unavailable
versions:
  ghec: '*'
topics:
  - Organizations
  - Teams
shortTitle: 利用不可能なアイデンティティプロバイダ
---

Organization の管理者は、シングルサインオンをバイパスするために、[ダウンロード済み、あるいは保存済みのリカバリコードのいずれか](/articles/downloading-your-organization-s-saml-single-sign-on-recovery-codes)を利用できます。 You may have saved these to a password manager, such as [LastPass](https://lastpass.com/) or [1Password](https://1password.com/).

{% note %}

**メモ:** リカバリコードは一度しか使えず、順番に使わなければなりません。 リカバリコードにより、アクセスが 24 時間許可されます。

{% endnote %}

1. シングルサインオンをバイパスするには、シングルサインオンダイアログの下部で、[**Use a recovery code**] をクリックします。 ![リカバリコードを入力するためのリンク](/assets/images/help/saml/saml_use_recovery_code.png)
2. [Recovery Code] フィールドにリカバリコードを入力します。 ![リカバリコードを入力するフィールド](/assets/images/help/saml/saml_recovery_code_entry.png)
3. [**Verify**] をクリックします。 ![リカバリコードを検証するボタン](/assets/images/help/saml/saml_verify_recovery_codes.png)

一度使用したリカバリコードは二度と使用できないということを覚えておいてください。 リカバリコードは再利用できません。

## 参考リンク

- [SAML シングルサインオンを使うアイデンティティおよびアクセス管理について](/articles/about-identity-and-access-management-with-saml-single-sign-on)

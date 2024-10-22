FROM postgres:14.3

# 日本語ロケールと日本時間の設定
RUN apt-get update \
    && apt-get install -y locales \
    && rm -rf /var/lib/apt/lists/* \
    && localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8

# 環境変数の設定
ENV LANG ja_JP.utf8
ENV TZ Asia/Tokyo

# PostgreSQLのパスワード設定
ENV POSTGRES_PASSWORD postgres
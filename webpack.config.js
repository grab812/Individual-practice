// Node.js 모듈 path 불러오기
const path = require('path')
const getAbsolutePath = (target) => path.resolve(__dirname, target);

// 플러그인 호출
const HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin')

// CommonJS 방식의 모듈 내보내기
module.exports = {
  // 번들링 모드 설정
  mode: 'development',
  // 엔트리 파일 설정
  entry: {
    'main': './src/index.js',
    // 'polyfills': './src/polyfills/index.js',
    // 'detect.polyfills': './src/polyfills/detect.js'
  },
  // 아웃풋 파일 출력 설정
  output: {
    // 경로
    path: getAbsolutePath('./dist'),
    // 파일 이름
    // 빌드(컴파일, 번들링 등) 결과 파일 브라우저 캐싱(Cachinig)
    filename: 'main.[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
    // Sass 파일 로더 설정
    {
        test: /\.s[ac]ss/i,
        use: [
        'style-loader',
        // css-loader 소스맵 옵션 활성화
        {
            loader: 'css-loader',
            options: {
            sourceMap: true
            }
        },
        // sass-loader 소스맵 옵션 활성화
        {
            loader: 'sass-loader',
            options: {
            sourceMap: true
            }
        }
        ]
    },
    // Babel 파일 로더 설정
    {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // Babel 플러그인 설정
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
    }]
  },
  devServer: {
      inline: false,
      contentBase: "./dist",
  },
  plugins: [
    // 플러그인 인스턴스 생성
    new HtmlWebpackPlugin({
        /** 플러그인 옵션 설정 **/
        // 문서 타이틀
        title: 'Webpack 러닝 가이드',
        // 문서 메타
        meta: {
          // <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          'X-UA-Compatible': {
            'http-equiv': 'X-UA-Compatible',
            'content': 'IE=edge',
          },
          // <meta name="theme-color" content="#4285f4" />
          'theme-color': '#4285f4',
        },
        // 파비콘
        // favicon: 'favicon.svg',
    }),
    new MiniCssExtractPlugin({ filename: 'app.css' })
  ],
  // 감시 활성화
  watch: true,
}
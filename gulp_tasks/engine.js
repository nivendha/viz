const gulp = require('gulp');
const gutil = require('gulp-util');

const webpack = require('webpack');
const webpackConf = require('../conf/webpack.conf');
const webpackDataEngineConf = require('../conf/webpack-dataEngine.conf');

const gulpConf = require('../conf/gulp.conf');

gulp.task('webpack:devDataEngine', done => {
  webpackWrapper(false, webpackDataEngineConf, done);
});

gulp.task('webpack:distDataEngine', done => {
  process.env.NODE_ENV = 'production';
  webpackWrapper(false, webpackDataEngineConf, done);
});

function webpackWrapper(watch, conf, done) {
  const webpackBundler = webpack(conf);

  const webpackChangeHandler = (err, stats) => {
    if (err) {
      gulpConf.errorHandler('Webpack')(err);
    }
    gutil.log(stats.toString({
      colors: true,
      chunks: false,
      hash: false,
      version: false
    }));
    if (done) {
      done();
      done = null;
    }
  };

  if (watch) {
    webpackBundler.watch(200, webpackChangeHandler);
  } else {
    webpackBundler.run(webpackChangeHandler);
  }
}

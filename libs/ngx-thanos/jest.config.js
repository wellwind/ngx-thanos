module.exports = {
  name: 'ngx-thanos',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/ngx-thanos',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

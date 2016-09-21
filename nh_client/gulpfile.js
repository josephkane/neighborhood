"use-strict"

const gulp = require("gulp")
const sass = require("gulp-sass")

gulp.task("sass", function() {
	return gulp.src("app/sass/main.sass")
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}))
	.pipe(gulp.dest("app/css/"))
})

gulp.task("watch", function () {
	gulp.watch("app/sass/**/*.s+(a|c)ss", ["sass"])
})

gulp.task("default", ["sass", "watch"])

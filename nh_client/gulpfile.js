"use-strict"

const gulp = require("gulp")
const sass = require("gulp-sass")

gulp.task("sass", function() {
	return gulp.src("src/sass/main.sass")
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}))
	.pipe(gulp.dest("app/css/"))
})

gulp.task("watch", function () {
	gulp.watch("sass/**/*.s+(a|c)ss", ["sass"])
})

gulp.task("default", ["sass", "watch"])

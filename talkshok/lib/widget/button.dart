import 'package:flutter/cupertino.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:get/get.dart';


class CustomButton extends StatelessWidget {
  String? title;
  Color? color;
  Color? bgcolor;
  VoidCallback? onPressed;

  CustomButton(
      {super.key, this.title, this.color, this.onPressed, this.bgcolor});

  @override
  Widget build(
    BuildContext context,
  ) {
    return CupertinoButton(
      onPressed: onPressed,
      child: Container(
        width: 327.w,
        height: 65.h,
        alignment: Alignment.center,
        decoration: BoxDecoration(
            color: bgcolor, borderRadius: BorderRadius.circular(12.r)),
        child: Text(
          title.toString(),
          style: TextStyle(
              fontSize: 18.sp, color: color, fontWeight: FontWeight.w500),
        ),
      ),
    );
  }
}

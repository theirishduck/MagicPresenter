//
//  PresentationController.m
//  PluginController
//
//  Created by James Tang on 18/4/2016.
//  Copyright © 2016 Magic Mirror. All rights reserved.
//

#import "MPPresentationController.h"
#import "MPPresentationViewController.h"
#import <MPTracker/MPTracker.h>

@interface MPPresentationController ()

@property (nonatomic, strong) NSWindowController *window;
@property (nonatomic, strong) MPPresentationViewController *controller;
@property (nonatomic, strong) TrackerManager *tracker;

@end

@implementation MPPresentationController

- (BOOL)launchWithSlides:(NSArray *)slides atIndex:(NSUInteger)index {
    SegmentIOTracker *segmentIO = [[SegmentIOTracker alloc] initWithWriteKey:@"SBHy82Wt9KnfUGY3rnFMETcAJSEvL2PA"];
    _tracker = [[TrackerManager alloc] initWithTrackers:@[segmentIO] identifier:@"io.magicsketch.tracker"];
    NSBundle *pluginBundle = [NSBundle bundleForClass:[self class]];

    NSString *env = nil;
#ifdef DEBUG
    env = @"Development";
#else
    env = @"Production";
#endif
    [_tracker setSuperProperties:@{
                                   @"Plugin Version":[pluginBundle objectForInfoDictionaryKey:@"CFBundleShortVersionString"],
                                   @"Plugin Build":[pluginBundle objectForInfoDictionaryKey:@"CFBundleVersion"],
                                   @"Plugin Environment":env,
                                   }];
    [_tracker track:@"Started" properties:@{}];
    [_tracker setAsSharedInstance];

    NSStoryboard *storyboard = [NSStoryboard storyboardWithName:@"MPPresentation" bundle:[NSBundle bundleForClass:[self class]]];
    NSWindowController *window = [storyboard instantiateInitialController];
    MPPresentationViewController *controller = (MPPresentationViewController *)window.contentViewController;
    _controller = controller;
    [_controller setSlides:slides atIndex:index];
    _window = window;
    [window showWindow:window.window];
    return YES;
}

@end
